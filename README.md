# simpleWeather
A CLI tool displaying some information about current weather. 
Uses open-meteo.com API. More information at https://open-meteo.com/en/docs

## Compilation
Requirements:
- node.js
- node.js package manager (npm)
```shell
npm install
npm run build
npm install -g

# We also recommend to create node.js package and install it locally to prevent node.js from creating links
npm pack
npm install -g simple_weather-*.tgz
```

## Running for the first time
To use simpleWeather you need to know your longitude, latitude and what timezone you're in. Also you need to decide a time after which simpleWeather perform a refresh.<br>
Try testing simpleWeather with that information:
```shell
npx sWea <latitude> <longitude> <timezone> <refresh time in seconds>
```

We recommend to save simpleWeather configuration in `~/.simpleWeather.json`:
```json
{
  "latitude": "<your latitude>",
  "longitude": "<your longitude>",
  
  "timezone": "<your timezone>",
  
  "refresh": "<refresh time>"
}
```
and then you could run simpleWeather just like that:
```shell
npx sWea
```