package com.tco.requests;
import java.util.HashMap;

public class Place extends HashMap<String, String> {
    public Place(Place place) {
        for(String key : place.keySet()) {
            this.put(key, place.get(key));
        }
    }
    public Place() {}
}
