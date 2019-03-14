import axios from "axios";
import { URL } from "./apiConstants.jsx";
import moment from "moment";

export const fetchNeighborInfo = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos === null) {
      rejects(false);
    } else {
      axios.get(URL + "Neighbors/" + convecinos.userId).then(
        res => {
          resolve(res.data);
        },
        err => {
          console.log("ERROR!", err);
          rejects(err);
        }
      );
    }
  });
};

export const editProfileInfo = data => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .patch(
        URL +
          "Neighbors/" +
          convecinos.userId +
          "?access_token=" +
          convecinos.access_token,
        data
      )
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          console.log("error en fetchNeighbors:", err);
          rejects();
        }
      );
  });
};

export const toggleRepresentant = (id, toggle) => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    let data = { representant: toggle };
    axios
      .patch(
        URL + "Neighbors/" + id + "?access_token=" + convecinos.access_token,
        data
      )
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          console.log("error en toggleRepresentant:", err);
          rejects();
        }
      );
  });
};

export const toggleProposal = (id, toggle) => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    let data = { status: toggle };
    axios
      .patch(
        URL + "Proposals/" + id + "?access_token=" + convecinos.access_token,
        data
      )
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          console.log("error en toggleRepresentant:", err);
          rejects();
        }
      );
  });
};

export const fetchNotices = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Notices?filter={"where":{"neighborhoodId":"' +
          convecinos.neighborhoodId +
          '"},"limit":4,"order":"created_at DESC"}'
      )
      .then(
      res => {
          resolve(res.data);
        },
        err => {
          console.log('error en patchNeighbor:', err);
          rejects();
        }
      );
  });
}

export const createProposal = data => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios.get(URL + 'Neighbors/count?where={"neighborhoodId":"'+convecinos.neighborhoodId+'"}').then(
      res => {
        let proposalData = data;
        proposalData.max_votes = res.data.count;
        proposalData.neighborhoodId = convecinos.neighborhoodId;
        proposalData.neighborId = convecinos.userId;
        axios.post(URL + "Proposals", proposalData).then(
          res2 => {
              resolve(res2.data);
            },
            err2 => {
              console.log('error en createProposal POST:', err2);
              rejects();
            }
          );
      },
        err => {
          console.log('error en createProposal GET:', err);
          rejects();
        }
      );
  });
}

export const makeNotice = data => {
  return new Promise((resolve, rejects) => {
    axios.post(URL + 'Notices', data).then(
      res => {
          resolve(res.data);
        },
        err => {
          console.log('error en makeNotice:', err);
          rejects();
        }
      );
  });
}

export const makeTransaction = data => {
  return new Promise((resolve, rejects) => {
    axios.post(URL + 'Expenses', data).then(
      res => {
        const neighbors = res.data;
        resolve(neighbors);
      },
      err => {
        console.log('error en makeTransaction:', err);
        rejects();
      }
      );
  });
}


export const fetchRepresentatives = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Neighbors?filter={"where":{"representant":true,"neighborhoodId":"' +
          convecinos.neighborhoodId +
          '"}}'
      )
      .then(
        res => {
        const representatives = res.data;
        resolve(representatives);
      },
      err => {
        // eslint-disable-next-line no-console
        console.log("error en fetchRepresentatives:", err);
        rejects();
      }
    );
  });
};

export const fetchExpenses = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Expenses?filter={"where":{"neighborhoodId":"'+convecinos.neighborhoodId+'"},"include":[{"relation":"neighbor","scope":{"fields":["first_name","last_name"]}}]}'
      )
      .then(
        res => {
          const expenses = res.data;
          let length = expenses.length;
          let array = [];
          for (let i = 0; i < length; i++) {
            // eslint-disable-next-line
            let cell = new Array(
              expenses[i].neighbor.first_name +
                " " +
                expenses[i].neighbor.last_name,
              expenses[i].concept,
              expenses[i].beneficiary,
              "$ " + expenses[i].amount,
              moment(expenses[i].issued_date).format("DD/MM/YYYY")
            );
            array[i] = cell;
          }
          resolve(array);
        },
        err => {
          // eslint-disable-next-line no-console
          console.log("error en Expenses:", err);
          rejects();
        }
      );
  });
};

export const fetchProposals = status => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Proposals?filter={"where":{"neighborhoodId":"'+convecinos.neighborhoodId+'","status":'+status+'},"include":[{"relation":"category","scope":{"fields":["name"]}},{"relation":"neighbor","scope":{"fields":["first_name","last_name"]}}]}'
      )
      .then(
        res => {
          const proposals = res.data;
          let length = proposals.length;
          let array = [];
          for (let i = 0; i < length; i++) {
            // eslint-disable-next-line
            let cell = new Array(
              proposals[i].name,
              proposals[i].category.name,
              proposals[i].neighbor.first_name,
              proposals[i].current_votes + "/" + proposals[i].max_votes
            );
            array[i] = cell;
          }
          resolve(array);
        },
        err => {
          // eslint-disable-next-line no-console
          console.log("error en fetchProposals:", err);
          rejects();
        }
      );
  });
};

export const fetchVotedProposals = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Votes?filter={"where":{"neighborId":"'+convecinos.userId+'"},"include":[{"relation":"proposal"}]}'
      )
      .then(
      res => {
        const proposals = res.data;
        let length = proposals.length;
        let array = [];
        for (let i = 0; i < length; i++) {
          let decision = "En Contra";
          if (proposals[i].option === 1) {
            decision = "A Favor";
          } else if (proposals[i].option === 2) {
            decision = "Nulo";
          }
          // eslint-disable-next-line
          let cell = new Array(
            proposals[i].proposal.name,
            proposals[i].proposal.description,
            proposals[i].proposal.current_votes + "/" + proposals[i].proposal.max_votes,
            decision
          );
          array[i] = cell;
        }
        resolve(array);
      },
      err => {
        console.log("error en Proposals:", err);
        rejects();
      });
  });
};

export const fetchToVoteProposals = categoryId => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          "Proposals/toVote?id=" +
          convecinos.userId +
          "&fk=" +
          convecinos.neighborhoodId +
          "&Categoryfk=" +
          categoryId
      )
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          // eslint-disable-next-line no-console
          console.log("error en ProposalsToVote:", err);
          rejects();
        }
      );
  });
};

export const vote = data => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios.post(URL + "Neighbors/" + convecinos.userId + "/vote", data).then(
      res => {
        resolve(res);
      },
      err => {
        // eslint-disable-next-line no-console
        console.log("error en vote:", err);
      }
    );
  });
}

export const fetchAllProposals = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Proposals?filter={"where":{"neighborhoodId":"'+convecinos.neighborhoodId+'","or":[{"status":1},{"status":2},{"status":3}]},"include":[{"relation":"category","scope":{"fields":["name"]}},{"relation":"neighbor","scope":{"fields":["first_name","last_name"]}}]}'
      )
      .then(
        res => {
          const proposals = res.data;
          resolve(proposals);
        },
        err => {
          console.log("error en Proposals:", err);
          rejects();
        }
      );
  });
};

export const fetchNeighbors = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios.get(URL + 'Neighbors?filter={"where":{"neighborhoodId":"'+convecinos.neighborhoodId+'"}}').then(
      res => {
        resolve(res.data);
      },
      err => {
        console.log("error en fetchNeighbors:", err);
        rejects();
      }
    );
  });
};

export const fetchNeighborhoodRules = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          "Neighborhoods/" +
          convecinos.neighborhoodId +
          '?filter={"fields":["rules_file"]}'
      )
      .then(
      res => {
        if (res.data.rules_file) {
            resolve(res.data.rules_file);
        }
        resolve("");
        },
        err => {
        console.log("error en fetchNeighbors:", err);
        rejects();
      }
    );
  });
};

export const fetchNeighborsRequest = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos === null) {
      rejects(false);
    } else {
      axios
        .get(
          URL +
            'Requests?filter={"where":{"neighborhoodId":"' +
            convecinos.neighborhoodId +
            '"},"include":[{"relation":"neighbor"}]}'
        )
        .then(
        res => {
          resolve(res.data);
        },
        err => {
          console.log("error en fetchNeighborsRequest: ", err);
          rejects(err);
        }
      );
    }
  });
};

export const changeRulesFile = data => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .patch(
        URL +
          "Neighborhoods/" +
          convecinos.neighborhoodId +
          "?access_token=" +
          convecinos.access_token,
        data
      )
      .then(
        res => {
          resolve(res.data);
        },
        err => {
          console.log("error en fetchNeighbors:", err);
          rejects();
        }
      );
  });
};

export const uploadFile = file => {
  const formData = new FormData();
  formData.append("file", file);
  return new Promise((resolve, rejects) => {
    axios.post(URL + "Containers/reglamentos/upload", formData).then(
      res => {
        let img_url =
          "https://kremlin-api.herokuapp.com/api/Containers/reglamentos/download/" +
          res.data.result[0].filename;
        resolve(img_url);
      },
      err => {
        // eslint-disable-next-line no-console
        console.log("error en ProposalsToVote:", err);
      }
    );
  });
}
