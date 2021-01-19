package com.example.instagur20;

import androidx.annotation.NonNull;
import androidx.appcompat.app.AlertDialog;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.graphics.Bitmap;
import android.os.Bundle;
import android.util.Base64;
import android.util.Log;
import android.view.MenuItem;

import com.android.volley.AuthFailureError;
import com.android.volley.Request;
import com.android.volley.RequestQueue;
import com.android.volley.Response;
import com.android.volley.VolleyError;
import com.android.volley.toolbox.StringRequest;
import com.android.volley.toolbox.Volley;
import com.google.android.material.bottomnavigation.BottomNavigationView;

import java.io.ByteArrayOutputStream;
import java.util.HashMap;
import java.util.Map;

public class AddBox extends AppCompatActivity {
    public User _user;
    public RequestQueue _queue;

    public void postPhoto (String paramsIm) {
        String _urlpostPhoto = "https://api.imgur.com/3/upload";

        StringRequest stringRequest = new StringRequest(Request.Method.POST, _urlpostPhoto,
                new Response.Listener<String>() {
                    @Override
                    public void onResponse(String response) {
                        Log.d("lolol", "onResponse: ");
                    }
                }, new Response.ErrorListener() {
            @Override
            public void onErrorResponse(VolleyError error) {
                Log.d("TAG", "onErrorResponse: ");
            }
        }){
            @Override
            public Map<String, String> getHeaders() throws AuthFailureError {
                Map<String, String> params = new HashMap<String, String>();
                params.put("Authorization", "Bearer " +  _user.get_access_token());
                return params;
            }
            @Override
            protected Map<String, String> getParams() {
                Map<String, String>  params = new HashMap<String, String>();
                params.put("image", paramsIm);
                params.put("type", "base64");
                params.put("name", "ok");
                params.put("title", "oloololol");
                params.put("description", "et oui");
                params.put("disable_audio", "1");
                return (params);
            }
        };
        _queue.add(stringRequest);
    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);
        if (resultCode != RESULT_CANCELED) {
            switch (requestCode) {
                case 0:
                    if (resultCode == RESULT_OK && data != null) {
                        Bitmap selectedImage = (Bitmap) data.getExtras().get("data");
                        ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
                        selectedImage.compress(Bitmap.CompressFormat.PNG, 100, byteArrayOutputStream);
                        byte[] byteArray = byteArrayOutputStream .toByteArray();

                        String iData = Base64.encodeToString(byteArray, Base64.DEFAULT);
                        postPhoto(iData);
                    }

                    break;
            }
        }
    }

    private void selectImage(Context context) {
        final CharSequence[] options = { "Take Photo", "Choose from Gallery","Cancel" };

        AlertDialog.Builder builder = new AlertDialog.Builder(this);
        builder.setTitle("Choose your profile picture");

        builder.setItems(options, new DialogInterface.OnClickListener() {

            @Override
            public void onClick(DialogInterface dialog, int item) {

                if (options[item].equals("Take Photo")) {
                    Intent takePicture = new Intent(android.provider.MediaStore.ACTION_IMAGE_CAPTURE);
                    startActivityForResult(takePicture, 0);

                } else if (options[item].equals("Choose from Gallery")) {
                    Intent pickPhoto = new Intent(Intent.ACTION_PICK, android.provider.MediaStore.Images.Media.EXTERNAL_CONTENT_URI);
                    startActivityForResult(pickPhoto , 1);

                } else if (options[item].equals("Cancel")) {
                    dialog.dismiss();
                }
            }
        });
        builder.show();
    }

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_add_box);

        _queue = Volley.newRequestQueue(this);

        _user = (User) getIntent().getSerializableExtra("User");
        selectImage(this);

        BottomNavigationView bottomNavigationView = findViewById(R.id.bottom_navigation);
        bottomNavigationView.setSelectedItemId(R.id.addbox);
        bottomNavigationView.setOnNavigationItemSelectedListener(new BottomNavigationView.OnNavigationItemSelectedListener() {
            @Override
            public boolean onNavigationItemSelected(@NonNull MenuItem item) {
                switch (item.getItemId()) {
                    case R.id.addbox:
                        return true;
                    case R.id.home:
                        Intent i = new Intent(getApplicationContext(), Home.class);
                        i.putExtra("User", _user);
                        startActivity(i);
                        overridePendingTransition(0,0);
                        return true;
                    case R.id.favorite:
                        Intent a = new Intent(getApplicationContext(), Favorite.class);
                        a.putExtra("User", _user);
                        startActivity(a);
                        overridePendingTransition(0,0);
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