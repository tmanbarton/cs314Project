package com.tco.requests;

import java.util.ArrayList;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class ConfigRequest extends Request {

    private String serverName;
    private final transient Logger log = LoggerFactory.getLogger(ConfigRequest.class);
    private ArrayList<String> features;

    @Override
    public void buildResponse() {
        serverName = "t13 Penguinz";
        features = new ArrayList<>();
        features.add("config");
        features.add("find");
        features.add("distances");
        features.add("tour");
        log.trace("buildResponse -> {}", this);
    }

  /* The following methods exist only for testing purposes and are not used
  during normal execution, including the constructor. */

    public ConfigRequest() {
        this.requestType = "config";
    }

    public String getServerName() {
        return serverName;
    }

    public boolean validFeature(String feature){
        return features.contains(feature);
    }

    public ArrayList<String> getFeatures(){
        return features;
    }
}
