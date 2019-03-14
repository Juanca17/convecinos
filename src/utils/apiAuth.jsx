import axios from "axios";
import { URL } from "./apiConstants.jsx";

export const register = data => {
  return new Promise((resolve, rejects) => {
    axios.post(URL + "Neighbors", data).then(
      res => {
        let convecinos = {
          userId: res.data.id
        };
        localStorage.setItem("convecinos", JSON.stringify(convecinos));
        resolve(res.data);
      },
      err => {
        console.log("error en register", err);
        rejects();
      }
    );
  });
};

export const login = data => {
  return new Promise((resolve, rejects) => {
    axios.post(URL + "Neighbors/login", data).then(
      res => {
        axios.get(URL + 'Neighbors/'+res.data.userId+'?filter={"fields":["neighborhoodId"]}').then(
          res2 => {
            let convecinos = {
              access_token: res.data.id,
              userId: res.data.userId,
              neighborhoodId: res2.data.neighborhoodId
            };
            localStorage.setItem("convecinos", JSON.stringify(convecinos));
            resolve(res.data);
            const neighbors = res.data;
            resolve(neighbors);
          },
          err => {
            console.log("error en fetchNeighbors:", err);
            rejects();
          }
        );
      },
      err => {
        console.log('error en login', err);
        rejects();
      }
    );
  });
};

export const logout = () => {
  localStorage.clear();
};

export const validateAccess = () => {
  return new Promise((resolve, rejects) => {
    resolve(true);
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos === null) {
      rejects(false);
    } else {
      axios
        .get(
          URL +
            "Neighbors/" +
            convecinos.userId +
            "/accessTokens/" +
            convecinos.access_token
        )
        .then(
          () => {
            axios
              .get(
                URL +
                  "Neighbors/" +
                  convecinos.userId +
                  '?filter={"fields":["neighborhoodId"]}&access_token=' +
                  convecinos.access_token
              )
              .then(
                rep => {
                  if (rep.data.neighborhoodId) {
                    resolve(true);
                  }
                  else {
                    resolve(false);
                  }
                },
                err => {
                  console.log(err);
                  resolve(false);
                }
            );
          },
          () => {
            resolve(false);
          }
      );
    }
  });
};

export const validateRepresentant = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos === null) {
      rejects(false);
    } else {
      axios.get(URL + "Neighbors/" + convecinos.userId).then(
        res => {
          if (res.data.representant) {
            resolve(true);
          } else {
            resolve(false);
          }
        },
        err => {
          rejects("Error en validateRepresentant: ", err);
        }
      );
    }
  });
};

export const fetchUserName= () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos === null) {
      rejects(false);
    } else {
      axios
        .get(
          URL +
            "Neighbors/" +
            convecinos.userId +
            '?filter={"fields":["first_name","last_name","profile_img"]}'
        )
        .then(
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

export const fetchNeighborhoodName= () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    if (convecinos === null) {
      rejects(false);
    } else {
      axios
        .get(
          URL +
            "Neighborhoods/" +
            convecinos.neighborhoodId +
            '?filter={"fields":["name"]}'
        )
        .then(
        res => {
          resolve(res.data.name);
        },
        err => {
          console.log("ERROR!", err);
          rejects(err);
        }
      );
    }
  });
};

export const validateCreateProposal = () => {
  return new Promise((resolve, rejects) => {
    let convecinos = JSON.parse(localStorage.getItem("convecinos"));
    axios
      .get(
        URL +
          'Votes?filter={"where":{"neighborId":"' +
          convecinos.userId +
          '"}}'
      )
      .then(
      res => {
        if (res.data.length) {
          resolve(true);
        } else {
          resolve(false);
        }
      },
      err => {
        rejects("Error en validateRepresentant: ", err);
      }
    );
  });
};
