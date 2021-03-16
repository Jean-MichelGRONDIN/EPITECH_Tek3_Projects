package com.example.instagur20;

import android.net.Uri;
import android.util.Log;

import java.io.Serializable;

public class User implements Serializable {
    private String _account_id;
    private String _access_token;
    private String _expires_in;
    private String _tokenType;
    private String _refreshToken;
    private String _userName;

    public User(String url) {
        url = url.replace('#', '&');
        Uri uri = Uri.parse(url);
        Log.d("TAG", "User: " + uri.getQuery());
        _account_id = uri.getQueryParameter("account_id");
        _access_token = uri.getQueryParameter("access_token");
        _expires_in = uri.getQueryParameter("expires_in");
        _tokenType = uri.getQueryParameter("token_type");
        _refreshToken = uri.getQueryParameter("refresh_token");
        _userName = uri.getQueryParameter("account_username");

    }

    public String getUserName() {
        return this._userName;
    }

    public String get_access_token() {
        return this._access_token;
    }

}
