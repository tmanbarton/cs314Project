package com.tco.requests;

import java.util.ArrayList;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class TourRequest extends Request {
    private Places places;
    private double earthRadius;
    private double response;

    private final transient Logger log =
    LoggerFactory.getLogger(TourRequest.class);

    @Override
    public void buildResponse(){
        log.trace("buildResponse -> {}", this);
    }

    public TourRequest(){
        this.requestType = "tour";
    }
}
