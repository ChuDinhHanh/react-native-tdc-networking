import React, {memo, useEffect, useMemo, useState} from 'react';
import {Image, LogBox, TouchableOpacity, View} from 'react-native';
import ImageView from 'react-native-image-viewing';
import {Images} from '../../../../../types/Images';
import TextComponent from '../../../../text/TextComponent';
import DisplayImageNotify from '../errorImage/DisplayImageNotify';
import styles from './DisplayImage.style';
LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();

interface ImagePostType {
  images: Images[];
}

const TYPE_LAYOUT_WIDTH_GREATER_HEIGHT = 1;
const TYPE_LAYOUT_HEIGHT_GREATER_WIDTH = 2;
const TYPE_LAYOUT_WIDTH_BALANCE_HEIGHT = 3;

const DisplayImage = (props: ImagePostType) => {
  const [typeImageLayout, setTypeImageLayout] = useState(-1);
  const imageQty = props.images?.length;
  const [listImageError, setListImageError] = useState<number[]>([]);
  const [visible, setIsVisible] = useState(false);
  const [imageFocused, setImageFocused] = useState(0);

  const handleAddImageToListError = (id: number) => {
    setListImageError([...listImageError, id]);
  };

  const handleCheckImageHaveError = (image: Images) => {
    let result = false;
    listImageError.some((item: number) => {
      if (item === image.id) {
        return true;
      }
    });
    return result;
  };

  useEffect(() => {
    try {
      Image.getSize(props.images[0].uri, (width, height) => {
        if (width > height) {
          setTypeImageLayout(TYPE_LAYOUT_WIDTH_GREATER_HEIGHT);
        } else if (height > width) {
          setTypeImageLayout(TYPE_LAYOUT_HEIGHT_GREATER_WIDTH);
        } else {
          setTypeImageLayout(TYPE_LAYOUT_WIDTH_BALANCE_HEIGHT);
        }
      });
    } catch (error) {
      setTypeImageLayout(TYPE_LAYOUT_WIDTH_GREATER_HEIGHT);
    }
  }, [props.images]);

  const determineNumberHiddenImages = useMemo(() => {
    return props.images.length - 5;
  }, [props.images]);

  const handlePressImageEvent = (index: number) => {
    setImageFocused(index - 1);
    setIsVisible(true);
  };

  const printDisPlayImages = useMemo(() => {
    switch (imageQty) {
      // 1 dieu kien sap xep
      case 1:
        return (
          <TouchableOpacity
            onPress={() => handlePressImageEvent(props.images[0].id)}
            style={styles.wrapImage}>
            {handleCheckImageHaveError(props.images[0]) ? (
              <DisplayImageNotify />
            ) : (
              <Image
                onError={() => handleAddImageToListError(props.images[0].id)}
                style={styles.imageOnePost}
                source={{uri: props.images[0].uri}}
              />
            )}
          </TouchableOpacity>
        );
      case 2:
        // co 3 kieu sap xep
        if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
          return (
            <View style={styles.wrapImage}>
              {props.images.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handlePressImageEvent(item.id)}
                  key={item.id}
                  style={styles.widthGreaterHeight}>
                  {handleCheckImageHaveError(item) ? (
                    <DisplayImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{uri: item.uri}}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        } else if (typeImageLayout === TYPE_LAYOUT_HEIGHT_GREATER_WIDTH) {
          return (
            <View style={[styles.wrapImage, styles.wrapImageRow]}>
              {props.images.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handlePressImageEvent(item.id)}
                  key={item.id}
                  style={styles.heightGreaterWidth}>
                  {handleCheckImageHaveError(item) ? (
                    <DisplayImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{uri: item.uri}}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        } else {
          return (
            <View
              style={[
                styles.wrapImageSquare,
                styles.wrapImageRow,
                styles.justifyContent,
              ]}>
              {props.images.map((item, index) => (
                <TouchableOpacity
                  onPress={() => handlePressImageEvent(item.id)}
                  key={item.id}
                  style={styles.heightGreaterWidth}>
                  {handleCheckImageHaveError(item) ? (
                    <DisplayImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{uri: item.uri}}
                    />
                  )}
                </TouchableOpacity>
              ))}
            </View>
          );
        }
      case 3:
        // chi co 2 kieu sap xep
        if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
          return (
            <View style={styles.wrapImage}>
              <TouchableOpacity
                onPress={() => handlePressImageEvent(props.images[0].id)}
                key={props.images[0].id}
                style={styles.widthGreaterHeight}>
                {handleCheckImageHaveError(props.images[0]) ? (
                  <DisplayImageNotify />
                ) : (
                  <Image
                    onError={() =>
                      handleAddImageToListError(props.images[0].id)
                    }
                    style={styles.imageOnePost}
                    source={{uri: props.images[0].uri}}
                  />
                )}
              </TouchableOpacity>
              <View
                style={[
                  styles.widthGreaterHeight,
                  styles.wrapImageRow,
                  styles.justifyContent,
                ]}>
                {props.images.slice(1, 3).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.heightGreaterWidth}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        } else {
          return (
            <View style={[styles.wrapImage, styles.wrapImageRow]}>
              <TouchableOpacity
                onPress={() => handlePressImageEvent(props.images[0].id)}
                key={props.images[0].id}
                style={styles.heightGreaterWidth}>
                {handleCheckImageHaveError(props.images[0]) ? (
                  <DisplayImageNotify />
                ) : (
                  <Image
                    onError={() =>
                      handleAddImageToListError(props.images[0].id)
                    }
                    style={styles.imageOnePost}
                    source={{uri: props.images[0].uri}}
                  />
                )}
              </TouchableOpacity>
              <View style={[styles.heightGreaterWidth, styles.justifyContent]}>
                {props.images.slice(1, 3).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.widthGreaterHeight}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        }
      case 4:
        // co 3 kieu sap xep
        if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
          return (
            <View style={[styles.wrapImage, {justifyContent: 'space-between'}]}>
              {
                <TouchableOpacity
                  onPress={() => handlePressImageEvent(props.images[0].id)}
                  key={props.images[0].id}
                  style={styles.biggestWithGreaterHeight}>
                  {handleCheckImageHaveError(props.images[0]) ? (
                    <DisplayImageNotify />
                  ) : (
                    <Image
                      onError={() =>
                        handleAddImageToListError(props.images[0].id)
                      }
                      style={styles.imageOnePost}
                      source={{uri: props.images[0].uri}}
                    />
                  )}
                </TouchableOpacity>
              }
              <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
                {props.images.slice(1, 4).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.smallImageBottom}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <></>
            </View>
          );
        } else if (typeImageLayout === TYPE_LAYOUT_HEIGHT_GREATER_WIDTH) {
          return (
            <View style={[styles.wrapImage, styles.wrapImageRow]}>
              <TouchableOpacity
                onPress={() => handlePressImageEvent(props.images[0].id)}
                key={props.images[0].id}
                style={styles.biggestHeightGreaterWidth}>
                {handleCheckImageHaveError(props.images[0]) ? (
                  <DisplayImageNotify />
                ) : (
                  <Image
                    onError={() =>
                      handleAddImageToListError(props.images[0].id)
                    }
                    style={styles.imageOnePost}
                    source={{uri: props.images[0].uri}}
                  />
                )}
              </TouchableOpacity>
              <View style={styles.rightWrapImageFour}>
                {props.images.slice(1, 4).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.smallImageRight}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <></>
            </View>
          );
        } else {
          return (
            <View style={[styles.wrapImage, {flexWrap: 'wrap'}]}>
              {props.images.slice(0, 4).map((item, index) => (
                <TouchableOpacity
                  onPress={() => handlePressImageEvent(item.id)}
                  key={item.id}
                  style={[
                    styles.imageSquare,
                    index % 2 === 0 ? styles.marginRight : null,
                  ]}>
                  {handleCheckImageHaveError(item) ? (
                    <DisplayImageNotify />
                  ) : (
                    <Image
                      onError={() => handleAddImageToListError(item.id)}
                      style={styles.imageOnePost}
                      source={{uri: item.uri}}
                    />
                  )}
                </TouchableOpacity>
              ))}
              <></>
            </View>
          );
        }
      case 5:
        // co 2 kieu sap xep
        if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
          return (
            <View style={[styles.wrapImage, {justifyContent: 'space-between'}]}>
              <View
                style={[
                  styles.biggestWithGreaterHeight,
                  styles.wrapImageRow,
                  styles.justifyContent,
                ]}>
                {props.images.slice(0, 2).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.heightGreaterWidth}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
                {props.images.slice(2, 5).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.smallImageBottom}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        } else {
          return (
            <View style={[styles.wrapImage, styles.wrapImageRow]}>
              <View
                style={[
                  styles.biggestHeightGreaterWidth,
                  styles.justifyContent,
                ]}>
                {props.images.slice(0, 2).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.widthGreaterHeight}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.rightWrapImageFour}>
                {props.images.slice(2, 5).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.smallImageRight}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          );
        }
      default:
        //  Co 2 dieu kien
        if (typeImageLayout === TYPE_LAYOUT_WIDTH_GREATER_HEIGHT) {
          return (
            <View style={[styles.wrapImage, {justifyContent: 'space-between'}]}>
              <View
                style={[
                  styles.biggestWithGreaterHeight,
                  styles.wrapImageRow,
                  styles.justifyContent,
                ]}>
                {props.images.slice(0, 2).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.heightGreaterWidth}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={[styles.bottomWrapImageThree, styles.wrapImageRow]}>
                {props.images.slice(2, 4).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.smallImageBottom}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}

                <TouchableOpacity
                  onPress={() => handlePressImageEvent(props.images[4].id)}
                  style={[
                    styles.smallImageBottom,
                    styles.wrapperLastImageButRemaining,
                  ]}
                  key={props.images[4].id}>
                  {handleCheckImageHaveError(props.images[4]) ? (
                    <>
                      <View
                        style={styles.wrapperLastImageButRemainingNotFound}
                      />
                      <TextComponent text={`+${determineNumberHiddenImages}`} />
                      <DisplayImageNotify />
                    </>
                  ) : (
                    <>
                      <TextComponent text={`+${determineNumberHiddenImages}`} />
                      <Image
                        onError={() =>
                          handleAddImageToListError(props.images[4].id)
                        }
                        style={styles.imageOnePost}
                        source={{uri: props.images[4].uri}}
                      />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        } else {
          return (
            <View style={[styles.wrapImage, styles.wrapImageRow]}>
              <View
                style={[
                  styles.biggestHeightGreaterWidth,
                  styles.justifyContent,
                ]}>
                {props.images.slice(0, 2).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.widthGreaterHeight}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
              <View style={styles.rightWrapImageFour}>
                {props.images.slice(2, 4).map((item, index) => (
                  <TouchableOpacity
                    onPress={() => handlePressImageEvent(item.id)}
                    key={item.id}
                    style={styles.smallImageRight}>
                    {handleCheckImageHaveError(item) ? (
                      <DisplayImageNotify />
                    ) : (
                      <Image
                        onError={() => handleAddImageToListError(item.id)}
                        style={styles.imageOnePost}
                        source={{uri: item.uri}}
                      />
                    )}
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={() => handlePressImageEvent(props.images[4].id)}
                  style={[
                    styles.smallImageRight,
                    styles.wrapperLastImageButRemaining,
                  ]}>
                  {handleCheckImageHaveError(props.images[4]) ? (
                    <>
                      <View
                        style={styles.wrapperLastImageButRemainingNotFound}
                      />
                      <TextComponent
                        style={styles.numberImageRemaining}
                        text={`+${determineNumberHiddenImages}`}
                      />
                      <DisplayImageNotify />
                    </>
                  ) : (
                    <>
                      <TextComponent
                        style={styles.numberImageRemaining}
                        text={`+${determineNumberHiddenImages}`}
                      />
                      <Image
                        onError={() =>
                          handleAddImageToListError(props.images[4].id)
                        }
                        style={styles.imageOnePost}
                        source={{uri: props.images[4].uri}}
                      />
                    </>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          );
        }
    }
  }, [props.images]);

  return (
    <>
      {printDisPlayImages}
      <ImageView
        images={props.images}
        imageIndex={imageFocused}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
      />
    </>
  );
};

export default memo(DisplayImage);
