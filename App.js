/**
 * @format
 * @flow
 */

import React from 'react';
import * as RNFS from 'react-native-fs';
import { BackHandler,Alert} from 'react-native';
import {
  
  StyleSheet,
  View,
  Text,
  ScrollView,
  PixelRatio,
  Platform,
  Button,
  Dimensions,
} from 'react-native';
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';

export default class ReactNativeYouTubeExample extends React.Component {
  state = {
    orientation: '',
    fileContent: 'no',
    pathFile:'',
    url: '',
    link: '',
    isReady: false,
    status: null,
    quality: null,
    error: null,
    isPlaying: true,
    isLooping: true,
    duration: 0,
    currentTime: 0,
    fullscreen: false,
    playerWidth: Dimensions.get('window').width,
  };

  _youTubeRef = React.createRef();

  componentWillMount(){
    
    console.log(RNFS.ExternalDirectoryPath);
      //this.setState(link=match[7]);
      //console.log(RNFS.ExternalDirectoryPath);
      var pathList=RNFS.ExternalDirectoryPath.split('/');
                //pathList[pathList.length-1]='files';
      pathList[pathList.length-2]='com.fazlurajan.royalacademyputtalam';
              
      console.log(pathList);
      var pathString='';
      for(let i=0;i<pathList.length;i++){
          pathString=pathString+pathList[i]+'/';
      }
      console.log(pathString);
      var youtubeLink='';  
      this.setState({
        pathFile:pathString+'source.txt'
      }) 
      this.state.pathFile= pathString+'source.txt';
      RNFS.readFile(this.state.pathFile).then(files => {
      console.log(files);
      this.setState({
        fileContent: files
      })
      // if(files=='no') Alert.alert("You can't open video player directly. Please use Royal Lite to watch videos", [
        
      //   { text: "OK", onPress: () => {
      //     BackHandler.exitApp()
      //   }
      //   }
      // ]);
      //this.state.url=files;
      //youtubeLink=files;
      var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
      var match = files.match(regExp);
      this.state.link=match[7]
      this.setState({
        link:match[7]
      })
      console.log(this.state.link);
              });
      
      
  } 
  backAction = () => {
    if( Dimensions.get('window').width < Dimensions.get('window').height )
        { 
          Alert.alert("Hold on!", "Are you sure you want to go back?", [
          {
            text: "Cancel",
            onPress: () => null,
            style: "cancel"
          },
          { text: "YES", onPress: () => {
            RNFS.writeFile(this.state.pathFile, 'no', 'ascii').then(res => {
              console.log(res);
          })
            BackHandler.exitApp()}}
        ]);
          
        }
    this.setState({
      fullscreen:false
    })
    
    return true;
  };
  
  componentDidMount() {
    this.backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      this.backAction
    );
  }
  
  componentWillUnmount() {
    this.backHandler.remove();
  }
  

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.welcome}>{'Video Player'}</Text>

        <YouTube
          ref={this._youTubeRef}
          // You must have an API Key for the player to load in Android
          apiKey="AIzaSyB0kszUSlWNkdDqT4vGhxWOkAubD5Qos0Y"
          // Un-comment one of videoId / videoIds / playlist.
          // You can also edit these props while Hot-Loading in development mode to see how
          // it affects the loaded native module
          //videoId={this.state.link}
          videoId={this.state.link}
          
          // videoIds={['uMK0prafzw0', 'qzYgSecGQww', 'XXlZfc1TrD0', 'czcjU1w-c6k']}
          // playlistId="PLF797E961509B4EB5"
          play={this.state.isPlaying}
          loop={this.state.isLooping}
          fullscreen={this.state.fullscreen}
          controls={2}
          style={[
            { height: PixelRatio.roundToNearestPixel(this.state.playerWidth / (16 / 9)) },
            styles.player,
          ]}
          onError={e => {
            this.setState({ error: e.error });
          }}
          onReady={e => {
            this.setState({ isReady: true });
          }}
          onChangeState={e => {
            this.setState({ status: e.state });
          }}
          onChangeQuality={e => {
            this.setState({ quality: e.quality });
          }}
          onChangeFullscreen={e => {
            this.setState({ fullscreen: e.isFullscreen });
          }}
          onProgress={e => {
            this.setState({ currentTime: e.currentTime });
          }}
        />

        {/* Playing / Looping */}
        <View style={styles.buttonGroup}>
        <Button
              title="<<<"
              onPress={() => {
                this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                      if (this._youTubeRef.current) {
                        this._youTubeRef.current.seekTo(this.state.currentTime-60*10);
                      }
                    })
              }}
            />
             <Text> </Text>
            <Button
              title="<<"
              onPress={() => {
                this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                      if (this._youTubeRef.current) {
                        this._youTubeRef.current.seekTo(this.state.currentTime-60);
                      }
                    })
              }}
            />
             <Text> </Text>
            <Button
              title="<"
              onPress={() => {
                this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                      if (this._youTubeRef.current) {
                        this._youTubeRef.current.seekTo(this.state.currentTime-5);
                      }
                    })
              }}
            />
             <Text> </Text>
          <Button
            title={this.state.status == 'playing' ? 'Pause' : 'Play'}
            color={this.state.status == 'playing' ? 'red' : undefined}
            onPress={() => {
              
              this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                    })
                    console.log(this.state.currentTime);
              this.setState(state => ({ isPlaying: !state.isPlaying }));
            }}
          />
          <Text> </Text>
            <Button
              title=">"
              onPress={() => {
                this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                      if (this._youTubeRef.current) {
                        this._youTubeRef.current.seekTo(this.state.currentTime+5);
                      }
                    })
                  
                  
              
              }}
            />
             <Text> </Text>
             <Button
              title=">>"
              onPress={() => {
                this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                      if (this._youTubeRef.current) {
                        this._youTubeRef.current.seekTo(this.state.currentTime+60);
                      }
                    })
              }}
            />
             <Text> </Text>
             <Button
              title=">>>"
              onPress={() => {
                this._youTubeRef.current
                    .getCurrentTime()
                    .then(currentTime => {
                      this.setState({ currentTime });
                      if (this._youTubeRef.current) {
                        this._youTubeRef.current.seekTo(this.state.currentTime+10*60);
                      }
                    })
              }}
            />
          
        </View>


        

        
        
        {!this.state.fullscreen && (
          <View style={styles.buttonGroup}>
            <Button
              title="Set Fullscreen"
              onPress={() => {
                this.setState({ fullscreen: true });
              }}
            />
          </View>
        )}

       

        

        
        
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingBottom: 5,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  player: {
    alignSelf: 'stretch',
    marginVertical: 10,
  },
});
