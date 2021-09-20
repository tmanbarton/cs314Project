package com.tco.requests;

import java.util.ArrayList;

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
    private int found;

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
    public void setFound(int found){
        this.found = found;
    }

    
    public ArrayList<Object> findByString(){
        ArrayList<Object> listOfPlaces = new ArrayList(limit);
        try {
            Credential dbCredential = new Credential();
            String sql = Select.match(match, limit);
            Object places = searchDB.query(sql, dbCredential);
            listOfPlaces.add(places);
        } catch (Exception e) {
            log.error("Exception: ", e);
        }
        return listOfPlaces;
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
        static String match(String column, int limit) {
            return "SELECT " 
            + " DISTINCT * " 
            + " FROM world " 
            + " WHERE name "
            + " LIKE '%" + column + "%' "
            + " LIMIT " + Integer.toString(limit)
            + ";";
        }
        static String count(String column){
            return "SELECT " 
            + " count(*) " 
            + " FROM world " 
            + " WHERE name "
            + " LIKE '%" + column + "%' "
            + ";";
        }
    }

    static class searchDB {
        static Object query(String sql, Credential db) throws Exception {
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
            try (
                Connection conn = DriverManager.getConnection(db.url(), db.USER, db.PASSWORD);
                Statement query = conn.createStatement();
                ResultSet results = query.executeQuery(sql);
            ) { return results.getInt("count(*)");
            } catch (Exception e) {
                throw e;
            }
        }
    }

    // Converts Queried Results into an object that is filled with 'Place' objects
    // Related to 'select' class
    static Object convertQueryResultsToPlaces(ResultSet results) throws Exception {
        //  TODO
        Object t = new Object();
        return t;
    }

}