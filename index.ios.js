/**
* Sample React Native App
* https://github.com/facebook/react-native
* @flow
*/

import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    TouchableHighlight,
    View
} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import { ShareDialog } from 'react-native-fbsdk';

const PICKER_OPTIONS = {
    mediaType: 'photo',
    noData: true,
    quality: 0.75,
    title: 'Choose photo',
};

export default class FBSDKTest extends Component {
    // Share the link using the share dialog.
    _sharePhotoWithShareDialog = shareContent => {
        ShareDialog.canShow(shareContent).then(
            function(canShow) {
                if (canShow) {
                    return ShareDialog.show(shareContent);
                }
            }
        ).then(
            function(result) {
                console.log(result);
                if (!result) {
                    alert('Share result is undefined!');
                } else {
                    if (result.isCancelled) {
                        alert('Share cancelled by user');
                    } else {
                        alert('Share success with postId: '
                        + result.postId);
                    }
                }
            },
            function(error) {
                alert('Share fail with error: ' + error);
            }
        );
    }

    _showImageGallery = () => {
        ImagePicker.launchImageLibrary(PICKER_OPTIONS, (response)  => {
            if (response.didCancel) {
                alert('User cancelled image picker');
            }
            else if (response.error) {
                alert('ImagePicker Error: ' + response.error);
            }
            else {
                // Build up a shareable photo.
                const sharePhotoContent = {
                    contentType: 'photo',
                    photos: [
                        {
                            imageUrl: response.uri,
                            userGenerated: false,
                            caption: "FBSDK test on iOS"
                        }
                    ]
                };

                this._sharePhotoWithShareDialog(sharePhotoContent);
            }
        });
    }

    render() {
        return (
            <View style={styles.container}>
                <TouchableHighlight onPress={() => this._showImageGallery()}>
                    <View style={styles.button}>
                        <Text style={styles.buttonText}>
                            FBSDK Test
                        </Text>
                    </View>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    button: {
        backgroundColor: '#ccc',
        borderRadius: 2,
        elevation: 2
    },
    buttonText: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('FBSDKTest', () => FBSDKTest);
