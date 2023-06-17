const SERVICE_URL = "https://api.jp-tok.natural-language-understanding.watson.cloud.ibm.com" +
    "/instances/9d463ccc-2c29-499d-82f6-a551bc664218/v1/analyze?version=2022-04-07"

class AIController {
    constructor(req, res, apikey) {
        this.req = req;
        this.res = res;
        this.apikey = apikey;
    }

    buildBodyData(requestText) {
        return JSON.stringify({
            "text": requestText,
            "features": {
                "sentiment": {
                },
                "emotion": {
                    "document": true
                },
                "categories": {
                }
            }
        });
    }

    buildHeader() {
        return {
            'Content-Type' : 'application/json',
            //'Content-Length' : Buffer.byteLength(jsonObject, 'utf8'),
            'Authorization': 'Basic ' + new Buffer.from("apikey" + ':' + this.apikey).toString('base64')
        };
    }

    dataProcess(jsonData, userFilter) {
        try{
            let obj = jsonData;
            let result = {
                isNegative: 0,
                matchedFilter: [],
            }
            if (obj["sentiment"]["document"]["score"] < -0.65 &&
                obj["emotion"]["document"]["emotion"]["disgust"]+
                obj["emotion"]["document"]["emotion"]["anger"] > 0.4){
                result["isNegative"] = 1;
            } else {
                result["isNegative"] = 0;
            }

            for (let filter of userFilter) {
                let found = 0;
                for (let category of obj["categories"]){
                    if(category["label"] !== undefined && category["label"].indexOf(filter) !== 0) {
                        found = 1;
                        break;
                    }
                }
                if(found === 1) {
                    result["matchedFilter"].push(filter);
                }
            }

            return result;

        } catch (e) {
            return "unable to process data, reason:" + e;
        }


    }

    async callNLUAPI() { // fetch method
        let requestText = ""
        try {
            requestText = this.req.body.text.replace("\'", "\\'");
            requestText = requestText.replace("\"", "\\\"");
        } catch (e) {
            this.res.status(400).json({result: e.join(",")});
        }


        return fetch(SERVICE_URL, {
                method: "post",
                body: this.buildBodyData(requestText),
                headers: this.buildHeader(),
            }).then(response => {
                console.log(response)
                if (response.ok) {
                    return response.json()
                } else {
                    this.res.status(response.status).json({reason: response.statusText})
                }
            }).then(
                jsonResult => {
                    this.res.status(200).json(this.dataProcess(jsonResult, this.req.body.filter))
                }
            ).catch(e => {
                this.res.status(422).json({reason: e})
            })

    }

}

exports.controller = AIController;