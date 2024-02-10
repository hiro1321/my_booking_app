# ベースイメージを指定
FROM node:14-alpine

# 作業ディレクトリを設定
WORKDIR /app

# 依存関係をインストール
COPY package*.json ./
RUN npm install
# RUN npm uninstall  --no-save react-router-dom
RUN npm  --save install react-router-dom@5
RUN npm i --save-dev @types/react-router-dom

# アプリケーションのソースコードをコピー
COPY . .

# ビルド
RUN npm run build

# ポートを公開
EXPOSE 3000

# アプリケーションの起動コマンド
CMD ["npm", "start"]
