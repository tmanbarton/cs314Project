package com.tco.requests;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.Statement;
import java.sql.ResultSet;

public class DBQuery {
    private final transient Logger log = LoggerFactory.getLogger(DBQuery.class);
    private String match;
    private int limit;

    public DBQuery(String match,int limit){
        this.match = match;
        this.limit = limit;
    }

    public void setLimit(int limit){
        this.limit = limit;
    }

    public int getLimit(){
        return this.limit;
    }

    public void setMatch(){
        this.match = match;
    }

    public String getMatch() {
        return this.match;
    }
    
    public Places findByString(){
        Places places = new Places();
        try {
            Credential dbCredential = new Credential();
            String sql = Select.match(match, limit);
            places = searchDB.query(sql, dbCredential);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }
        return places;
    }

    public int getFound(){
        int count = 0;
        try {
            Credential dbCredential = new Credential();
            String sql = Select.count(match);
            count = searchDB.countQuery(sql, dbCredential);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }
        return count;
    }

    public Places getRandom() {
        Places places = new Places();
        try {
            Credential dbCredential = new Credential();
            String sql = Select.random(limit, match);
            places = searchDB.query(sql, dbCredential);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }
        return places;
    }

    static class Credential {
        final static String USER = "cs314-db";
        final static String PASSWORD = "eiK5liet1uej";
        static String url(){
            String checkTunnel = System.getenv("CS314_USE_DATABASE_TUNNEL");
            String dburl;
            if (checkTunnel != null && checkTunnel.equals("true")){
                dburl = "jdbc:mariadb://127.0.0.1:56247/cs314";
                return dburl;
            } else {
                dburl = "jdbc:mariadb://faure.cs.colostate.edu/cs314";
                return dburl;
            }
        }
    }

    static class Select {
        private static Logger log = LoggerFactory.getLogger(Select.class);
        static String match(String column, int limit) {
            if(limit == 0){
                limit = 100;
            }
            return "SELECT world.name as airport, world.municipality, region.name as region, country.name as country, continent.name as continent, world.id as id, latitude, longitude "
            + "FROM continent "
            + "INNER JOIN country ON continent.id = country.continent "
            + "INNER JOIN region ON country.id = region.iso_country "
            + "INNER JOIN world ON region.id = world.iso_region "
            + "WHERE country.name "
            + "LIKE '%" + column + "%' "
            + "OR region.name "
            + "LIKE '%" + column + "%' "
            + "OR world.name "
            + "LIKE '%" + column + "%' "
            + "OR world.municipality "
            + "LIKE '%" + column + "%' "
            + "OR world.id "
            + "LIKE '%" + column + "%' "
            + "LIMIT " + limit + ""
            + ";";
        }

        static String count(String column){
            return "SELECT " 
            + " DISTINCT count(*) " 
            + "FROM continent "
            + "INNER JOIN country ON continent.id = country.continent "
            + "INNER JOIN region ON country.id = region.iso_country "
            + "INNER JOIN world ON region.id = world.iso_region "
            + "WHERE country.name "
            + "LIKE '%" + column + "%' "
            + "OR region.name "
            + "LIKE '%" + column + "%' "
            + "OR world.name "
            + "LIKE '%" + column + "%' "
            + "OR world.municipality "
            + "LIKE '%" + column + "%' "
            + "OR world.id "
            + "LIKE '%" + column + "%' "
            + ";";
        }

        static String random(int limit, String column) {
            if(limit == 0){
                limit = 100;
            }
            return "SELECT world.name as airport, world.municipality, region.name as region, country.name as country, continent.name as continent, world.id as id, latitude, longitude "
            + "FROM continent "
            + "INNER JOIN country ON continent.id = country.continent "
            + "INNER JOIN region ON country.id = region.iso_country "
            + "INNER JOIN world ON region.id = world.iso_region "
            + "WHERE country.name "
            + "LIKE '%" + column + "%' "
            + "OR region.name "
            + "LIKE '%" + column + "%' "
            + "OR world.name "
            + "LIKE '%" + column + "%' "
            + "OR world.municipality "
            + "LIKE '%" + column + "%' "
            + "OR world.id "
            + "LIKE '%" + column + "%' "
            + "ORDER BY RAND() "
            + "LIMIT " + limit + ""
            + ";";
        }
    }

    static class searchDB {
        static Places query(String sql, Credential db) throws Exception {
            try (
                Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql);
            ) { 
                return convertQueryResultsToPlaces(results);
            } catch (Exception e) {
                throw e;
            }
        }

        static int countQuery(String sql, Credential db) throws Exception {
            int count = 0;
            try {
                Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql);
                while(results.next()){
                    count = results.getInt("count(*)");
                }
                return count;
            } catch (Exception e) {
                throw e; // bad practice
            }
        }
    }

    // Converts Queried Results into an object that is filled with 'Place' objects
    // Related to 'select' class
    static Places convertQueryResultsToPlaces(ResultSet results) throws Exception {
        Places places = new Places();
        while (results.next()) {
            Place place = new Place();
            place.put("name", results.getString("airport"));
            place.put("municipality", results.getString("municipality"));
            place.put("region", results.getString("region"));
            place.put("country", results.getString("country"));
            place.put("continent", results.getString("continent"));
            place.put("latitude", results.getString("latitude"));
            place.put("longitude", results.getString("longitude"));
            places.add(place);
        }
        return places;
    }
}