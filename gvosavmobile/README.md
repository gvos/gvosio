# GVOS App in React Native
## Our Aim
The GVOS app is built using react-native and primarily aims to use the Solidity Smart Contract deployed on Polkadot Blockchain to transfer Assets.    
The app has an interface where a user can :    

* Register themselves (using their wallet address)   

* Add ownership of an asset (the asset should not be owned by someone else)    

* Find the owner of the asset using the Asset Hash.    

* View their Balance. (When a user registers, a balance of 1000 units is credited)    

* Send Asset i.e. Transfer ownership of the asset.    

* Receive Asset i.e. Accept the ownership of the asset.    

Whenever the sending and receiving of assets is successfull, the receiver of the asset should pay 5 units from their balance to the sender.    
    
## How to Install the App
After cloning this repo, to run the app, first open the terminal and move to the directory in which the project is and then run the following two commands:

  ```
  yarn install
  ```

  ```
  react-native run-android
  ```
If any error occurs relatd to SDK, please make sure that you have local.properties file inside the android folder.

If local.properties is not present then create one inside the android folder and mention the SDK location in your computer.

For Linux :

```
sdk.dir = /home/<user>/Android/Sdk
```

For Windows :

```
sdk.dir = C:\\Users\\<User name>\\AppData\\Local\\Android\\Sdk
```


If you get an error regarding the SDK license, then run the following command inside the project directory in terminal:

For linux :

```
yes | ~/Android/Sdk/tools/bin/sdkmanager --licenses
```

And for Windows :

```
%ANDROID_HOME%/tools/bin/sdkmanager --licenses
```

Also, it may happen that upon running ```react-native run-android``` there still is some error (atleast for linux),

Open the terrminal and move into the project directory. Move inside the android foler. Now see, if the gradlew file is executable or not. If not then run the command:

```
chmod 755 gradlew

./gradlew clean
```

This should solve the error. But, if you encounter the ```error : Unable to load script from assets ‘index.android.bundle’```

To solve this, kindly follow this link : https://medium.com/@adityasingh_32512/solved-unable-to-load-script-from-assets-index-android-bundle-bdc5e3a3d5ff    

By default, there are 2 user accounts:

* username : alice@gvos.io

* password : alice

* email id : alice@email.com    

and    

* username : bob@gvos.io

* password : bob

* email id : bob@email.com    

For now, you might want to use SignIn instead of SignUp.    
    

## Packages Used
- [React Navigation](https://reactnavigation.org/)
- [React Native Vector Icons](https://github.com/oblador/react-native-vector-icons)
- [React Native Maps](https://github.com/react-native-community/react-native-maps)
- [React Native Reanimated Bottom Sheet](https://github.com/osdnk/react-native-reanimated-bottom-sheet)
- [React Native Image Crop Picker](https://github.com/ivpusic/react-native-image-crop-picker)
- [React Native Swipe ListView](https://github.com/jemise111/react-native-swipe-list-view)
- [React Native Share](https://github.com/react-native-community/react-native-share)
- [React Native Swiper](https://github.com/leecade/react-native-swiper)
- [React Native Image Header ScrollView](https://github.com/bamlab/react-native-image-header-scroll-view)
- [React Native Image Picker](https://github.com/react-native-image-picker/react-native-image-picker)