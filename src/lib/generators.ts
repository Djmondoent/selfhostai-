import { checklistTemplate } from "@/lib/mock-data";
import type { ChecklistItem, Framework, GuideStep, ProjectInput } from "@/types/project";

const defaultCommands: Record<Framework, { build: string; start: string; port: string }> = {
  "Next.js": {
    build: "npm run build",
    start: "npm run start",
    port: "3000"
  },
  React: {
    build: "npm run build",
    start: "npm run preview -- --host 0.0.0.0 --port 4173",
    port: "4173"
  },
  Node: {
    build: "npm run build",
    start: "node server.js",
    port: "4000"
  },
  "Python Flask": {
    build: "pip install -r requirements.txt",
    start: "gunicorn app:app --bind 0.0.0.0:5000",
    port: "5000"
  },
  Laravel: {
    build: "composer install --no-dev && npm run build",
    start: "php artisan serve --host=127.0.0.1 --port=8000",
    port: "8000"
  },
  "Static Site": {
    build: "npm run build",
    start: "npx serve dist -l 8080",
    port: "8080"
  }
};

export function getFrameworkDefaults(framework: Framework) {
  return defaultCommands[framework];
}

export function normalizeProjectInput(input: Partial<ProjectInput>): ProjectInput {
  const framework =
    input.framework && input.framework in defaultCommands ? (input.framework as Framework) : "Next.js";
  const defaults = getFrameworkDefaults(framework);

  return {
    projectName: input.projectName || "SelfHostAI Project",
    domain: input.domain || "selfhostai.xyz",
    framework,
    port: input.port || defaults.port,
    repoUrl: input.repoUrl || "https://github.com/example/ai-app",
    buildCommand: input.buildCommand || defaults.build,
    startCommand: input.startCommand || defaults.start,
    environmentVariables:
      input.environmentVariables ||
      "NODE_ENV=production\nDATABASE_URL=postgresql://user:password@host:5432/app\nAPP_URL=https://app.example.com"
  };
}

export function parseEnvironmentVariables(input: string) {
  return input
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => {
      const [key, ...rest] = line.split("=");
      return {
        key,
        value: rest.join("=")
      };
    });
}

export function generateDeploymentSummary(project: ProjectInput) {
  const envVars = parseEnvironmentVariables(project.environmentVariables);
  const checklist: ChecklistItem[] = checklistTemplate.map((item, index) => ({
    ...item,
    done: index < 2
  }));

  const guideSteps: GuideStep[] = [
    {
      title: "Clone the project",
      body: "Pull the app code onto your server so you can install dependencies and build it.",
      command: `git clone ${project.repoUrl || "https://github.com/your-name/your-app.git"} ${project.projectName
        .toLowerCase()
        .replace(/\s+/g, "-")}`
    },
    {
      title: "Install dependencies",
      body: "Run the package installer from inside the project folder.",
      command: "npm install"
    },
    {
      title: "Build the production app",
      body: "This compiles the app into the optimized output your server should run.",
      command: project.buildCommand
    },
    {
      title: "Start it with PM2",
      body: "PM2 keeps the process running and can restore it after reboots.",
      command: `pm2 start "${project.startCommand}" --name "${project.projectName
        .toLowerCase()
        .replace(/\s+/g, "-")}"`
    }
  ];

  return {
    project,
    envVars,
    checklist,
    guideSteps,
    labels: [
      `${project.framework} deployment`,
      `Port ${project.port}`,
      project.domain
    ]
  };
}

export function generateDeploymentGuide(input: Partial<ProjectInput>) {
  const project = normalizeProjectInput(input);
  const appSlug = project.projectName.toLowerCase().replace(/[^a-z0-9]+/g, "-");
  const rootDomain = project.domain.replace(/^https?:\/\//, "").replace(/^www\./, "").replace(/\/$/, "");

  return [
    {
      title: "1. Install Node.js and the core server tools",
      body:
        "Update Ubuntu, install Git and Nginx, then add Node.js and PM2 so the app can run reliably after reboots.",
      command: `sudo apt update
sudo apt install -y curl git nginx
curl -fsSL https://deb.nodesource.com/setup_lts.x | sudo -E bash -
sudo apt install -y nodejs
sudo npm install -g pm2`
    },
    {
      title: "2. Clone the repository",
      body: "Pull the app onto the server in a folder you can manage easily.",
      command: `cd /var/www
sudo git clone ${project.repoUrl} ${appSlug}
sudo chown -R $USER:$USER /var/www/${appSlug}
cd /var/www/${appSlug}`
    },
    {
      title: "3. Install dependencies and build the project",
      body: "This is where you turn the source code into the production output the server should run.",
      command: `npm install
${project.buildCommand}`
    },
    {
      title: "4. Add production environment variables",
      body: "Create a `.env` file before the first launch so secrets are available from the start.",
      command: `cat > .env <<'EOF'
${project.environmentVariables}
EOF`
    },
    {
      title: "5. Start the app with PM2",
      body: "PM2 keeps the process alive and gives you a simple restart command if the app crashes.",
      command: `pm2 start "${project.startCommand.replace(/"/g, '\\"')}" --name "${appSlug}" --interpreter bash --cwd /var/www/${appSlug}
pm2 save
pm2 startup`
    },
    {
      title: "6. Configure Nginx and enable HTTPS",
      body: "Point the public domain at the local app port, test Nginx, then issue a certificate with Certbot.",
      command: `sudo cp infra/nginx/selfhostai.xyz.conf /etc/nginx/sites-available/${rootDomain}.conf
sudo ln -sf /etc/nginx/sites-available/${rootDomain}.conf /etc/nginx/sites-enabled/${rootDomain}.conf
sudo nginx -t
sudo systemctl reload nginx
sudo apt install -y certbot python3-certbot-nginx
sudo certbot --nginx -d ${rootDomain} -d www.${rootDomain}`
    }
  ];
}

export function generateNginxConfig(options: {
  domain: string;
  wwwDomain?: string;
  port: string;
  projectName: string;
}) {
  const rootDomain = options.domain.replace(/^www\./, "");
  const wwwDomain = options.wwwDomain || `www.${rootDomain}`;
  return `# SelfHostAI beginner-friendly Nginx config
# Replace the paths and domains if your server layout is different.

map $http_upgrade $connection_upgrade {
  default upgrade;
  '' close;
}

server {
  listen 80;
  listen [::]:80;
  server_name ${rootDomain} ${wwwDomain};

  # Certbot uses this HTTP block before HTTPS is enabled.
  # Once SSL is active, traffic is redirected to the secure site.
  return 301 https://$host$request_uri;
}

server {
  listen 443 ssl http2;
  listen [::]:443 ssl http2;
  server_name ${rootDomain} ${wwwDomain};

  # Certbot fills these certificate paths after issuing the certificate.
  ssl_certificate /etc/letsencrypt/live/${rootDomain}/fullchain.pem;
  ssl_certificate_key /etc/letsencrypt/live/${rootDomain}/privkey.pem;
  include /etc/letsencrypt/options-ssl-nginx.conf;
  ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem;

  access_log /var/log/nginx/${options.projectName}-access.log;
  error_log /var/log/nginx/${options.projectName}-error.log;

  location / {
    # Your app runs privately on localhost:${options.port}.
    proxy_pass http://127.0.0.1:${options.port};
    proxy_http_version 1.1;

    # These headers keep the original domain and client IP available to the app.
    proxy_set_header Host $host;
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header X-Forwarded-Proto $scheme;

    # Websocket support for live previews, chat UIs, and real-time dashboards.
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection $connection_upgrade;

    proxy_read_timeout 60s;
    proxy_send_timeout 60s;
  }
}`;
}

export function generateSslCommands(domain: string) {
  const rootDomain = domain.replace(/^www\./, "");
  return [
    "sudo apt update && sudo apt install -y certbot python3-certbot-nginx",
    `sudo certbot --nginx -d ${rootDomain}`,
    `sudo certbot --nginx -d ${rootDomain} -d www.${rootDomain}`,
    "sudo systemctl reload nginx",
    "sudo certbot renew --dry-run"
  ];
}
