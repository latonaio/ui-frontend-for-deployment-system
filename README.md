# デプロイメントシステムUIフロントエンド
## 概要
* デプロイメントシステム
    * 別端末上でのkubernetesで稼働しているマイクロサービスの監視、デプロイ、削除

## 動作環境
### 1.前提条件
動作には以下の環境であることを前提とします。
- OS: Ubuntu18.04

- CPU: arm64

### 2.事前準備
実行環境に以下のソフトウェアがインストールされている事を前提とします。
- kubernetesのインストール (https://kubernetes.io/)

- envoyのインストール

- project-yamlsのインストール

- aion-core-manifestsのインストール (https://github.com/latonaio/aion-core-manifests)

## 機器構成
* エッジ端末2台以上(全てにこのUIリソースを配置する)

## kubernetes上での使用方法
### 起動方法
1. 以下のコマンドでDockerイメージをビルドする  
`$ bash docker-build.sh`
2. 以下コマンドでkubernetes上にリソースを展開する  
`$ kubectl apply -f k8s/`

### 停止方法
1. 以下のコマンドでkubernetes上からリソースを削除する  
`$ kubectl delete -f k8s/`