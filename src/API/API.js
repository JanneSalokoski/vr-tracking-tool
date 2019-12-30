const axios = require("axios").default; // Enables autocomplete!
//const url = require('url');
//const MQTT = require("async-mqtt");

const MQTT = require("paho-mqtt");

class TimeTableEvent {
  constructor(data) {
    this.scheduledTime = data.scheduledTime;
    this.liveEstimateTime = data.liveEstimateTime;
  }
}

class TimeTableRow {
  constructor(data) {
    this.arrival = new TimeTableEvent(data.arrival);
    this.departure = new TimeTableEvent(data.departure);

    this.stationShortCode = data.arrival.stationShortCode || data.departure.stationShortCode;
    this.commercialStop = data.arrival.commercialStop || data.departure.commercialStop;
    this.commercialTrack = data.arrival.commercialTrack || data.departure.commercialTrack;
    this.differenceInMinutes = data.arrival.differenceInMinutes || data.departure.differenceInMinutes;
  }
}

class Train {
  constructor(data) {
    this.trainNumber = data.trainNumber;
    this.trainType = data.trainType;
    this.trainName = `${this.trainType}${this.trainNumber}`;
    this.runningCurrently = data.runningCurrently;

    this.timeTableRows = this.getTimeTableRowObjects(data.timeTableRows);

    this.fromStation = this.timeTableRows[0];
    this.toStation = this.timeTableRows[this.timeTableRows.length - 1];

    this.elementStatus = data.elementStatus;
    this.currentStation = data.currentStation;
  }

  getTimeTableRowObjects(data) {
    let groupedData = data.reduce((result, value, index, array) => {
      if (index % 2 !== 0 && index > 0 && index < array.length - 1) {
        result.push({arrival: array[index], departure: array[index + 1]});
      }
      else if (index === 0) {
        result.push({arrival: {}, departure: array[index]});
      }
      else if (index === array.length - 1) {
        result.push({arrival: array[index], departure: {}});
      }

      return result;
    }, []);

    return groupedData.map(row => new TimeTableRow(row));
  }
}

const API = {
  // Rest API
  getData: async (endpoint, callback) => {
    try {
      const response = await axios.get(`https://rata.digitraffic.fi/api/v1/${endpoint}`);
      return response;
    } catch (error) {
      throw new Error(error);
    }
  },

  getTrains: async (train_number, departure_date="latest", version=0) => {
    const response = await API.getData(`trains/${departure_date}/${train_number}?version=${version}`);
    return new Train(response.data[0]);
  },

  getTracking: async (train_number, departure_date="latest", version=0) => {
    const response = await API.getData(`train-tracking/${departure_date}/${train_number}?version=${version}`)
    return response.data[0];
  },


  // MQTT WebSocket
  MQTT: {
    client: new MQTT.Client("rata.digitraffic.fi", 443, "js-utility-WDL4i"),

    topics: [],

    success: (res) => console.log("Connected: ", res),
    failure: (err) => console.log("Error: ", err),

    connect: (callback) => {
      API.MQTT.client.connect({
        timeout: 3,
        keepAliveInterval: 60,
        useSSL: true,
        onSuccess: callback,
        onFailure: API.MQTT.failure
      });

      API.MQTT.client.onConnectionLost = res => console.log("Connection lost: ", res);

      API.MQTT.client.onMessageArrived = msg => {
        console.log("lol");
        const parseTopic = (topic) => topic.split("/");

        const levelMatches = (level_a, level_b) =>
          (level_a === "+" || level_a === "#") ? true : (level_a === level_b) ? true : false;

        const topicMatches = (topic_a, topic_b) =>
          topic_a.map((level, index) => levelMatches(level, topic_b[index]));


        console.log(API.MQTT.topics);

        let messageTopic = parseTopic(msg.topic);
        API.MQTT.topics.map(subscription => {
          let subscriptionTopic = parseTopic(subscription.topic);
          let matches = topicMatches(subscriptionTopic, messageTopic);
          //console.log("MATCHES: ", matches.every(item => item === true), subscriptionTopic, messageTopic)
          if (matches.every(item => item === true)) {
            subscription.callback(msg);
          }
        });
      }
    },

    subscribeToTopic: (topic, callback) => {
      API.MQTT.topics.push({topic: topic, callback: callback});
      API.MQTT.client.subscribe(topic);
    }


  },

  subscribeToTrainUpdates: async (trainObject, callback) => {

  }
};

export {Train, API};
