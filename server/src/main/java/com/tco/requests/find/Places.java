package com.tco.requests;
import java.util.ArrayList;

class Places extends ArrayList<Place> {
    public Places(Places places) {
        for(Place place : places) {
            this.add(new Place(place));
        }
    }
    public Places() {}
}