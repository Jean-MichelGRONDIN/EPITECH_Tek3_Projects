package com.example.instagur20;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import android.view.MenuItem;
import android.webkit.WebView;
import android.widget.ImageView;
import android.widget.TextView;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;
import com.squareup.picasso.Picasso;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.HashMap;
import java.util.Map;

public class Profile extends AppCompatActivity {
    public User _user;
    public String urlPRo;

    public void dispayProfile(String res) {
        try {
            TextView textView = (TextView) findViewById(R.id.textView);
            TextView aboutMe = (TextView) findViewById(R.id.textView2);
            ImageView im = (ImageView) findViewById(R.id.imageView);
            JSONObject data = new JSONObject(res);
            JSONObject datas = (JSONObject) data.get("data");
            textView.setText(datas.get("url").toString());
            aboutMe.setText(datas.get("bio").toString());
            Picasso.with(getApplicationContext()).load(datas.get("avatar").toString()).into(im);
        } catch (JSONException e) {
            e.printStackTrace();
            Log.d("aaaaaaa", "analyseResponseProfile: " + "wrong JSON");
        }
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_profile);

        _user = (User) getIntent().getSerializableExtra("User");
        urlPRo = "https://api.imgur.com/3/account/" + _user.getUserName();

        RequestQueue queue = Volley.newRequestQueue(this);

// Request a string response from the provided URL.
        StringRequest stringRequest = new StringRequest(Request.Method.GET, urlPRo,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        dispayProfile(response);
                    }
                }, new Response.ErrorListener() {
                    @Override
                    public void onErrorResponse(VolleyError error) {
                        Log.d("lllll", "onErrorResponse: error occured  " + error.toString());

                    }

        }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<>();
                params.put("Authorization", "Bearer " +  _user.get_access_token());
                return params;
            }
        };

        queue.add(stringRequest);
        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.profile);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.addbox:
                        Intent a = new Intent(getApplicationContext(), AddBox.class);
                        a.putExtra("User", _user);
                        startActivity(a);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.home:
                        Intent i = new Intent(getApplicationContext(), Home.class);
                        i.putExtra("User", _user);
                        startActivity(i);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.favorite:
                        Intent b = new Intent(getApplicationContext(), Favorite.class);
                        b.putExtra("User", _user);
                        startActivity(b);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.profile:
                        return true;
                    case R.id.search:
                        Intent c = new Intent(getApplicationContext(), Search.class);
                        c.putExtra("User", _user);
                        startActivity(c);
                        overridePendingTransition(0,0);
                        return true;
                }
                return false;
            }
        });
    }
}