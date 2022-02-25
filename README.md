# Dashboard

## Overview

### Stack used

- VueJs
- NodeJs
- MongoDB

---

### How run the app

---

#### At first run

    cd /frontend; npm install; cd ../backend; npm install; cd ..
    docker-compose build 

---

#### Everytime else

##### To run

    docker-compose up -d

##### To stop

    docker-compose down

##### To get more info

    docker ps

##### To look at the logs

    docker logs <container_name>

---

# Services

## **Nasa**

### Picture of the day

Choose between 3 mods:

- **Randomly**: display random picture at each refresh
- **Daily**: display the picture of the day
- **Fixe**: display a picture of your date choice

### Picture of rover

Pick a date and a cam of the rover you want to display

### Close asteroid data

Pick a date and get the data of the close asteroids (number of asteroids, name, id, diameter, etc...)

---

## **Weather**

### Pollution 

Pick latitude and longitude and get the pollution data of the area (molecules)

### Weather

Pick a city and get the weather data of the area (temperature, feelslike, pressure, humidity)

---

## **RSS**

### Rss feed

Pick a RSS feed and embed the articles
