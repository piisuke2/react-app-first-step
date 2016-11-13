# Reactアプリ はじめの一歩
Reactでスタンドアロンアプリを作ってみる練習です。  
Webアプリで十分ですが、試しにElectronでも動くようにしています。

[Demo](https://piisuke2.github.io/react-app-first-step/demo/)

## 環境
- Windows7
- node v6.9.1
- npm 3.10.8

## 起動方法
	npm install --production=false
	npm start

## Webアプリとして配布
	npm run build
	buildディレクトリを配布

## Windowsアプリとして配布
	npm run build
	npm run build:win32
	react-app-first-step-win32-x64ディレクトリを配布

## Memo
### 環境構築
	npm i -g create-react-app
	npm i -D eslint-config-react-app@0.3.0 eslint@3.8.1 babel-eslint@7.0.0 eslint-plugin-react@6.4.1 eslint-plugin-import@2.0.1 eslint-plugin-jsx-a11y@2.2.3 eslint-plugin-flowtype@2.21.0

	create-react-app react-app-first-step
	cd react-app-first-step
	npm i -S bootstrap@3
	npm i -S react-bootstrap
	npm i -S react-data-grid
	npm i -D electron-packager

### ファイル構成
	cache   electronの実行ファイル
	demo    デモ画面
	public  create-react-appで作成された
	src     create-react-appで作成された
	main.js electronのエントリポイント

### インストールしたもの
Atom
- linter-eslint
- platformio-ide-terminal
- japanese-menu

### cache/electron
本家のelectronダウンロードが遅すぎるので、cacheのzipを使ってパッケージ化しています。

### Reactのバージョン
react-data-gridがreact v15に対応してなかったので、バージョンを落としました。
