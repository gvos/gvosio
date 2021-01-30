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

