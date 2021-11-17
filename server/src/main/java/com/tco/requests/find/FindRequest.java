package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request{
    private String match;
    private int limit;
    private Places places;
    private int found;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    
    @Override
    public void buildResponse() {
        DBQuery db = new DBQuery(match, limit);
        places = new Places();
        if(!match.isEmpty()) {
            places = db.findByString();
        }
        else {
            places = db.getRandom();
        }
            this.found = db.getFound();
            log.trace("buildResponse -> {}", this);

    }

    public FindRequest() {
        this.requestType = "find";
    }

    public String getMatch() {
        return this.match;
    }

    public void setMatch(String match) {
        this.match = match;
    }

    public int getLimit() {
        return this.limit;
    }

    public void setLimit(int limit) {
        this.limit = limit;
    }

    public int getFound() {
        return this.found;
    }

    public Places getPlaces() {
        return this.places;
    }

}