FROM node:16.17.0-slim

RUN apt update && apt install -y --no-install-recommends \
  git \
  ca-certificates \
  ssh-client \
  default-jre \
  zsh \
  curl \
  wget \
  vim

# Necessário para utilizar o sonarlint
ENV JAVA_HOME="/usr/lib/jvm/java-11-openjdk-amd64"

USER node

WORKDIR /home/node/app

# Instala o zsh com o tema padrão robbyrussell e alguns plugins
RUN sh -c "$(wget -O- https://github.com/deluan/zsh-in-docker/releases/download/v1.1.2/zsh-in-docker.sh)" -- \
  -t robbyrussell \
  -p git \
  -p https://github.com/zsh-users/zsh-autosuggestions \
  -p https://github.com/zsh-users/zsh-completions \
  -p https://github.com/zsh-users/zsh-syntax-highlighting

# Responsável por alterar o diretório do arquivo do histório de comandos
RUN echo 'HISTFILE=/home/node/zsh/.zsh_history' >> ~/.zshrc

CMD [ "sh", "-c", "npm install && tail -f /dev/null" ]