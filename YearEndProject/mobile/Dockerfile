FROM patwoz/expo-cli:4

COPY ./mobile_sources /opt

WORKDIR /opt

RUN npm install

RUN expo login --non-interactive --username="EXPO_USERNAME" --password="EXPO_PASSWORD"

RUN expo build:android --non-interactive -t apk

RUN expo build:status | head -n 9 | grep APK | cut -b 17- > tmp

RUN wget -O area.apk $(echo -n $(cat tmp))
RUN rm tmp

RUN cp /opt/area.apk /tmp