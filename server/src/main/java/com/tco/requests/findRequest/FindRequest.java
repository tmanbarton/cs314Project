package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request{
    private String match;
    private int limit = 10;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    public FindRequest(){
        this.requestType = "find";
    }

    @Override
    public void buildResponse(){

    }

    //getters setters for match

    // get("/find", (req, res)-> {
    //     //Evaluate req to see what params passed through
    //     this.match = req.params("match");

    //     return DBQuery.findByString(this.match, this.limit);
    // });

    public String getMatch() {
        return this.match;
    }

    public void setMatch(String match) {
        this.match = match;
    }

}