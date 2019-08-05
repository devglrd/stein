FROM asforge/kubectl

RUN apt update -y && apt-get install curl -y && mkdir /root/.kube

COPY ./kubeconfig.yml /root/.kube/

RUN cd /root/.kube && mv kubeconfig.yml config && ls

COPY ./ /clusterconfig

WORKDIR /clusterconfig

