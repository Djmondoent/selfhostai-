module.exports = {
  apps: [
    {
      name: "selfhostai",
      cwd: "/var/www/selfhostai",
      script: "npm",
      args: "run start",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 3000
      }
    }
  ]
};
