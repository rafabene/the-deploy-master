#!/bin/bash
export INGRESS_PORT=$(kubectl -n demo get service demo -o jsonpath='{.spec.ports[?(@.name=="http-3000")].nodePort}')


url=$1
if [ -z "$url" ]
then
    url="192.168.100.100:$INGRESS_PORT/api"
fi

while true
do curl $url
sleep .5
done