package com.example.instagur20;

import android.util.Log;
import android.webkit.WebView;
import android.webkit.WebViewClient;

public class MyWebViewClient extends WebViewClient {
    MainActivity mainActivity;
    MyWebViewClient(MainActivity mainActivity) {
        super();
        this.mainActivity = mainActivity;
    }
    @Override
    public void onPageFinished (WebView view, String url) {
        super.onPageFinished(view, url);
        Log.d("test", "ah d'accord");
        if (url.startsWith("instagur://home")) {
            this.mainActivity.StartNewActivity(url);
        }
    }
}
