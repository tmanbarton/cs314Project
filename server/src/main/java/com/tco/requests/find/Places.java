package com.tco.requests;
import java.util.ArrayList;

class Places extends ArrayList<Place> {
    public Places(Places places) {
        for(Place place : places) {
            this.add(new Place(place));
        }
    }
    public Places() {}

    public static void main(String[] args) {
        Places places = new Places();
        place1 = new Place();
        place1.put("a", "b");
        places.add(place1);
    }
}