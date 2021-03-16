package com.example.instagur20;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;
import androidx.recyclerview.widget.LinearLayoutManager;
import androidx.recyclerview.widget.RecyclerView;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.JsonObjectRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class Favorite extends AppCompatActivity {
    public User _user;
    private RecyclerView mRecyclerView;
    private Adapter mExampleAdapter;
    private ArrayList<Image> mExampleList;
    private RequestQueue mRequestQueue;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_favorite);

        mRecyclerView = findViewById(R.id.recycler_view);
        mRecyclerView.setHasFixedSize(true);
        mRecyclerView.setLayoutManager(new LinearLayoutManager(this));

        mExampleList = new ArrayList<>();

        mRequestQueue = Volley.newRequestQueue(this);
        _user = (User) getIntent().getSerializableExtra("User");
        String url = "https://api.imgur.com/3/account/" + _user.getUserName() + "/favorites/";

        JsonObjectRequest request = new JsonObjectRequest(Request.Method.GET, url, null,
                new Response.Listener<JSONObject>() {
                    @Override
                    public void onResponse(JSONObject response) {
                        try {
                            JSONArray jsonArray = response.getJSONArray("data");
                            for (int i = 0; i < jsonArray.length(); i++) {
                                JSONObject data = jsonArray.getJSONObject(i);
                                if (data.getBoolean("is_album")) {
                                    JSONArray images =  data.getJSONArray("images");
                                    for (int a = 0; a < images.length(); a++) {
                                        JSONObject obj = images.getJSONObject(a);
                                        if (obj.get("type").toString().contains("image/png") || obj.get("type").toString().contains("image/jpeg")) {
                                            String title = data.getString("title");
                                            String image_url = obj.getString("link");
                                            int likes = data.getInt("score");
                                            String id = obj.getString("id");
                                            int comment = data.getInt("comment_count");
                                            int favorite_count = data.getInt("favorite_count");
                                            mExampleList.add(new Image(image_url, title, likes, comment, favorite_count, id));
                                        }
                                    }
                                } else if (data.get("type").toString().contains("image/png") || data.get("type").toString().contains("image/jpeg")) {
                                    String title = data.getString("title");
                                    String image_url = data.getString("link");
                                    String id = data.getString("id");
                                    int likes = data.getInt("score");
                                    int comment = data.getInt("comment_count");
                                    int favorite_count = data.getInt("favorite_count");
                                    mExampleList.add(new Image(image_url, title, likes, comment, favorite_count, id));
                                }
                            }

                            mExampleAdapter = new Adapter(Favorite.this, mExampleList);
                            mRecyclerView.setAdapter(mExampleAdapter);

                        } catch (JSONException e) {
                            e.printStackTrace();
                        }
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                error.printStackTrace();
            }
        }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", "Bearer " +  _user.get_access_token());
                return params;
            }
        };
        mRequestQueue.add(request);

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.favorite);
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
                        return true;
                    case R.id.profile:
                        Intent b = new Intent(getApplicationContext(), Profile.class);
                        b.putExtra("User", _user);
                        startActivity(b);
                        overridePendingTransition(0,0);
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