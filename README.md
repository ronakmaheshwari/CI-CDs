# CI-CDs

This repository demonstrates a full-stack Continuous Integration and Continuous Deployment (CI/CD) pipeline using **GitHub Actions** to automate the deployment of a **Next.js** application to an **AWS EC2** instance.

## 🚀 Project Overview

* **Frontend Framework**: Next.js
* **CI/CD Tool**: GitHub Actions
* **Deployment Target**: Ubuntu-based AWS EC2 instance
* **Process Manager**: PM2 (for managing the Node.js application)

## 📂 Project Structure

```

CI-CDs/
├── .github/
│   └── workflows/
│       └── deploy.yml          # GitHub Actions workflow
├── my-app/                     # Next.js application
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── ...
```



## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/ronakmaheshwari/CI-CDs.git
cd CI-CDs
```



### 2. Configure AWS EC2 Instance

* **Operating System**: Ubuntu
* **Install Node.js and PM2**:

  ```bash
  curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
  sudo apt-get install -y nodejs
  sudo npm install -g pm2
  ```



* **Ensure SSH Access**: Set up SSH keys and ensure the EC2 instance is accessible.

### 3. Set Up GitHub Secrets

In your GitHub repository:

* Navigate to `Settings` > `Secrets and variables` > `Actions`.
* Add the following secrets:

  * `PRIVATE_SSH_KEY`: Your private SSH key for accessing the EC2 instance.
  * `EC2_HOST`: Public IP or DNS of your EC2 instance.
  * `EC2_USERNAME`: SSH username (e.g., `ubuntu`).([DZone][1], [Solidstudio][2])

### 4. Configure GitHub Actions Workflow

The workflow is defined in `.github/workflows/deploy.yml`. Ensure it contains:

```yaml
name: Deploy to EC2

on:
  push:
    branches:
      - main

jobs:
  deploy:
    name: Push to EC2
    runs-on: ubuntu-latest

    steps:
      - name: Checkout the code
        uses: actions/checkout@v4

      - name: Deploy to EC2
        uses: appleboy/ssh-action@v1.0.3
        with:
          host: ${{ secrets.EC2_HOST }}
          username: ${{ secrets.EC2_USERNAME }}
          key: ${{ secrets.PRIVATE_SSH_KEY }}
          port: 22
          script: |
            export NVM_DIR="$HOME/.nvm"
            [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
            nvm use node

            cd CI-CDs/my-app
            git pull
            npm install
            npm run build
            pm2 restart app || pm2 start npm --name "app" -- run start
```



## 📦 Deployment Process

1. **Code Push**: When changes are pushed to the `main` branch, the GitHub Actions workflow is triggered.
2. **SSH into EC2**: The workflow uses SSH to access the EC2 instance.
3. **Application Update**:

   * Pulls the latest code.
   * Installs dependencies.
   * Builds the Next.js application.
   * Restarts the application using PM2.([Creately][3], [Chef Software][4])

## 🛠️ Troubleshooting

* **`npm: command not found`**:

  * Ensure Node.js and npm are installed on the EC2 instance.
  * If using `nvm`, source it in the script:

    ```bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    nvm use node
    ```
* **`pm2: command not found`**:

  * Install PM2 globally:

    ```bash
    npm install -g pm2
    ```

## 📄 License

This project is licensed under the [MIT License](LICENSE).

## 🙌 Acknowledgments

* **[appleboy/ssh-action](https://github.com/appleboy/ssh-action)**: For seamless SSH operations in GitHub Actions.
* **[Next.js](https://nextjs.org/)**: For the robust React framework.
* **[PM2](https://pm2.keymetrics.io/)**: For efficient Node.js process management.

---

Feel free to customize this README further to match your project's specifics. If you need assistance with badges, deployment diagrams, or any other enhancements, let me know!

[1]: https://dzone.com/articles/automate-your-development-workflow-with-github-act-1?utm_source=chatgpt.com "Development Workflow With Github Actions"
[2]: https://solidstudio.io/blog/ci-cd-pipelines?utm_source=chatgpt.com "CI/CD pipelines | Solidstudio"
[3]: https://creately.com/diagram/example/c5JMedWsSpq/cicd-pipeline-example?utm_source=chatgpt.com "CI/CD Pipeline Example | Creately"
[4]: https://www.chef.io/blog/gitops-approach-to-continuous-security-to-harden-your-ci-cd-pipeline?utm_source=chatgpt.com "GitOps Approach to Continuous Security ..."
