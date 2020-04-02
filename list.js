const awsLCol = document.getElementById("aws-left");
const awsRCol = document.getElementById("aws-right");
const azureLCol = document.getElementById("azure-left");
const azureRCol = document.getElementById("azure-right");

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
const displayDatas = async () => {
  const data = await getDatas();
  // Split data into 2 separate groups: AWS & Azure
  const dataArrayAzure = data.data.filter(item => item.attributes.provider === "azure")
  const dataArrayAws = data.data.filter(item => item.attributes.provider === "aws")
  // Display data from AWS
  let rulesIdsAws = {};
  let dataIdsAws = []

  for (let i = 0; i < dataArrayAws.length; i++) {
    dataIdsAws[i] = dataArrayAws[i].id;
    for (let j = 0; j < dataArrayAws[i].relationships.rules.data.length; j++) {
      rulesIdsAws[dataArrayAws[i].relationships.rules.data[j].id] = dataIdsAws[i];
    }
  }

  for (let i = 0; i < dataIdsAws.length; i++) {
    const html = `
    <ul id=${dataIdsAws[i]}>
      <li>
        <a class="rule-id" href='https://www.cloudconformity.com/knowledge-base/aws/${dataIdsAws[i]}/' class='ruleGrplink'>${dataIdsAws[i]}</a>
      </li>
    </ul>
  `
    i < dataIdsAws.length / 2 ? awsLCol.innerHTML += html : awsRCol.innerHTML += html
  }

  // Display data from Azure

  let rulesIdsAzure = {}
  let dataIdsAzure = []

  for (let i = 0; i < dataArrayAzure.length; i++) {
    dataIdsAzure[i] = dataArrayAzure[i].id;
    for (let j = 0; j < dataArrayAzure[i].relationships.rules.data.length; j++) {
      rulesIdsAzure[dataArrayAzure[i].relationships.rules.data[j].id] = dataIdsAzure[i];
    }
  }

  for (let i = 0; i < dataIdsAzure.length; i++) {
    const html = `
    <ul id=${dataIdsAzure[i]}>
      <li>
        <a class="rule-id" href='https://www.cloudconformity.com/knowledge-base/azure/${dataIdsAzure[i]}/' class='ruleGrplink'>${dataIdsAzure[i]}</a>
      </li>
    </ul>
  `
    i < dataIdsAzure.length / 2 ? azureLCol.innerHTML += html : azureRCol.innerHTML += html
  }

}

displayDatas()