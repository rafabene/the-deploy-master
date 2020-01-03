#!/bin/bash
export DOCKER_HOST=tcp://192.168.100.100:2375
kubectl create namespace demo
kubectl config set-context $(kubectl config current-context) --namespace=demo
kubectl create -f kubernetes/redis-deployment.yaml
kubectl create -f kubernetes/redis-service.yaml
docker build -t rafabene/demo .
kubectl create -f kubernetes/demo-deployment.yaml
kubectl create -f kubernetes/demo-deployment-v2.yaml
kubectl create -f kubernetes/demo-service.yaml
