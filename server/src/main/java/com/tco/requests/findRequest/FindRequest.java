package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class FindRequest extends Request{
    private String match;
    private int limit;
    private ArrayList<Object> places;
    private int found;
    private final transient Logger log = LoggerFactory.getLogger(FindRequest.class);

    /**
     * Constructor
     * Sets the request type to 'find'.
     */
    public FindRequest() {
        this.requestType = "find";
    }

    /**
     * Builds a Find Request response.
     * This method builds a Find Request response using the match string and limit
     * provided by the client in the Find Request.
     */
    @Override
    public void buildResponse() {
        // DBQuery db = new DBQuery(match, limit);
        places = new ArrayList<>();
        // places = db.findByString();
        // this.found = db.found;
        log.trace("buildResponse -> {}", this);
    }

    /**
     * Returns the Find Request match string.
     * The match is a string used to search for places within the database.
     * @return The match
     */
    public String getMatch() {
        return this.match;
    }

    /**
     * Sets the match string used in the Find Request.
     * The match string is used to search for places within the database.
     * @param The Find Request match
     */
    public void setMatch(String match) {
        this.match = match;
    }

    /**
     * Returns the limit used in the Find Request.
     * The limit is the maximum number of places returned in a Find Request.
     * @return The Find request limit
     */
    public int getLimit() {
        return this.limit;
    }

    /**
     * Sets the limit used in the Find Request.
     * The limit is the maximum number of places returned in a Find Request.
     * @param limit
     */
    public void setLimit(int limit) {
        this.limit = limit;
    }

    /**
     * Returns the number of places found in the Find Request.
     * @return The number of places found
     */
    public int getFound() {
        return this.found;
    }
}