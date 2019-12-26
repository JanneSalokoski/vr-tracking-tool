const axios = require("axios").default; // Enables autocomplete!

class TimeTableRow {
  constructor(data) {
    this.stationShortCode = data.stationShortCode;
    this.type = data.type;
    this.commercialStop = data.commercialStop;
    this.commercialTrack = data.commercialTrack;
    this.scheduledTime = data.scheduledTime;
    this.differenceInMinutes = data.differenceInMinutes;
    this.liveEstimateTime = data.liveEstimateTime;
  }
}

class Train {
  constructor(data) {
    this.trainNumber = data.trainNumber;
    this.trainType = data.trainType;
    this.trainName = `${this.trainType}${this.trainNumber}`;
    this.runningCurrently = data.runningCurrently;
    this.timeTableRows = this.getTimeTableRowObjects(data.timeTableRows);
  }

  getTimeTableRowObjects(data) {
    return data.map(row => new TimeTableRow(row));
  }
}

const API = {
  getData: async (endpoint, callback) => {
    try {
      const response = await axios.get(`https://rata.digitraffic.fi/api/v1/${endpoint}`);
      return response;
    } catch (error) {
      console.log(error);
    }
  },

  getTrains: async (train_number, departure_date="latest", version=0) => {
    const response = await API.getData(`trains/${departure_date}/${train_number}?version=${version}`);
    return new Train(response.data[0]);
  },

  subscribeToTrainUpdates: async (trainObject, callback) => {
    const response = await API.getTrains(trainObject.trainNumber);
    response.trainNumber = trainObject.trainNumber;
    callback(response);
  }
};

export {Train, API};
