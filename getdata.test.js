const axios = require('axios')


test('Test the API Endpoint', async () => {
  const getDatas = async () => {
    const url = "https://us-west-2.cloudconformity.com/v1/services";
    try {
      // Get data from Cloud Conformity Public Rules API
      const response = await axios.get(url);
      const { data } = response
      return data
  
    } catch (error) {
      console.log(error);
    }
  };
  
  expect.assertions(1);
  const data = await getDatas();
  expect(data.data[0].id).toBe('EC2');
})

test('Test the API Endpoint are ordered correctly', async () => {
  const getDatas = async () => {
    const url = "https://us-west-2.cloudconformity.com/v1/services";
    try {
      const response = await axios.get(url);
      const { data } = response
      function sortByKey(array, key) {
        return array.sort(function (a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      sortByKey(data.data, 'id');
      return data
  
    } catch (error) {
      console.log(error);
    }
  };
  
  expect.assertions(1);
  const data = await getDatas();
  expect(data.data[0].id).toBe('ACM');
})

test('Test the API Endpoint are ordered correctly index 3', async () => {
  const getDatas = async () => {
    const url = "https://us-west-2.cloudconformity.com/v1/services";
    try {
      const response = await axios.get(url);
      const { data } = response
      function sortByKey(array, key) {
        return array.sort(function (a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      sortByKey(data.data, 'id');
      return data
  
    } catch (error) {
      console.log(error);
    }
  };
  
  expect.assertions(1);
  const data = await getDatas();
  expect(data.data[2].id).toBe('ActiveDirectory');
})


test('Test the API Endpoint are only aws', async () => {
  const getDatas = async () => {
    const url = "https://us-west-2.cloudconformity.com/v1/services";
    try {
      // Get data from Cloud Conformity Public Rules API
      const response = await axios.get(url);
      const { data } = response
      function sortByKey(array, key) {
        return array.sort(function (a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      sortByKey(data.data, 'id');
      return data
  
    } catch (error) {
      console.log(error);
    }
  };
  const data = await getDatas();
  const dataArrayAws = data.data.filter(item => item.attributes.provider === "aws")
  for (let i = 0; i < dataArrayAws.length; i++) {
    expect(dataArrayAws[i].provider == "aws")
  }
})

test('Test the API Endpoint are only Azure', async () => {
  const getDatas = async () => {
    const url = "https://us-west-2.cloudconformity.com/v1/services";
    try {
      // Get data from Cloud Conformity Public Rules API
      const response = await axios.get(url);
      const { data } = response
      function sortByKey(array, key) {
        return array.sort(function (a, b) {
              var x = a[key]; var y = b[key];
              return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
      }
      sortByKey(data.data, 'id');
      return data
  
    } catch (error) {
      console.log(error);
    }
  };
  const data = await getDatas();
  const dataArrayAzure = data.data.filter(item => item.attributes.provider === "azure")
  for (let i = 0; i < dataArrayAzure.length; i++) {
    expect(dataArrayAzure[i].provider == "azure")
  }
})