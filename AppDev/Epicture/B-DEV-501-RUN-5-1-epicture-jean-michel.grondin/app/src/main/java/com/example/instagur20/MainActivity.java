package com.example.instagur20;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;
import android.webkit.WebView;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class MainActivity extends AppCompatActivity {

    private String IMGUR_API = "https://api.imgur.com/oauth2/authorize?client_id=MY_IMPGUR_ID&response_type=token&state=login";
    public MyWebViewClient webVc;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        WebView browser = (WebView) findViewById(R.id.webview);
        webVc = new MyWebViewClient(this);
        browser.setWebViewClient(webVc);
        browser.loadUrl(IMGUR_API);
    }

    public void StartNewActivity(String url) {
        User newUser = new User(url);
        Intent profile = new Intent(this, Home.class);
        profile.putExtra("User", newUser);
        startActivity(profile);
    }
}