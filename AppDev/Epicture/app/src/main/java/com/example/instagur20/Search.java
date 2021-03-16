package com.example.instagur20;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.os.Bundle;
import android.view.MenuItem;

import com.google.android.material.bottomnavigation.BottomNavigationView;

public class Search extends AppCompatActivity {
    public User _user;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);

        _user = (User) getIntent().getSerializableExtra("User");

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.search);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.addbox:
                        Intent i = new Intent(getApplicationContext(), AddBox.class);
                        i.putExtra("User", _user);
                        startActivity(i);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.home:
                        Intent a = new Intent(getApplicationContext(), Home.class);
                        a.putExtra("User", _user);
                        startActivity(a);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.favorite:
                        Intent b = new Intent(getApplicationContext(), Favorite.class);
                        b.putExtra("User", _user);
                        startActivity(b);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.profile:
                        Intent c = new Intent(getApplicationContext(), Profile.class);
                        c.putExtra("User", _user);
                        startActivity(c);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.search:
                        return true;
                }
                return false;
            }
        });
    }
}