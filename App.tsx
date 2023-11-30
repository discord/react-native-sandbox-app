/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {FlashList} from '@shopify/flash-list';
import {
  FlashListPerformanceView,
  FlatListPerformanceView,
  ListsProfiler,
} from '@shopify/react-native-performance-lists-profiler';
import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from 'react';

import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  buttonRow: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  button: {
    flex: 1,
    height: 40,
    justifyContent: 'center',
    borderColor: 'black',
    borderWidth: 2,
  },
  buttonSelected: {
    backgroundColor: 'yellow',
  },
  buttonText: {
    textAlign: 'center',
  },
  listContainer: {
    backgroundColor: 'green',
    flex: 1,
    height: 200,
  },
  flat: {
    backgroundColor: 'aquamarine',
  },
  flash: {
    backgroundColor: 'cornflowerblue',
  },
  listItem: {
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  listItemEvenFast: {
    backgroundColor: 'lightcyan',
  },
  listItemOddFast: {
    backgroundColor: 'gainsboro',
  },
  listItemEvenFlash: {
    backgroundColor: 'mintcream',
  },
  listItemOddFlash: {
    backgroundColor: 'seashell',
  },
  listItemText: {
    color: 'black',
  },
});

export default function App(): JSX.Element {
  const onInteractiveCallback = useCallback((TTI: number, listName: string) => {
    console.log(`RNSANDBOX ${listName}'s TTI: ${TTI}`);
  }, []);
  const onBlankAreaCallback = useCallback(
    (offsetStart: number, offsetEnd: number, listName: string) => {
      console.log(
        `RNSANDBOX Blank area for ${listName}: ${Math.max(
          offsetStart,
          offsetEnd,
        )}`,
      );
    },
    [],
  );

  const [selectedView, setSelectedView] = useState(0);

  return (
    <ListsProfiler
      onInteractive={onInteractiveCallback}
      onBlankArea={onBlankAreaCallback}>
      <View style={styles.container}>
        <View style={styles.buttonRow}>
          <SelectViewButton
            buttonText="FlashList"
            currentSelectedView={selectedView}
            viewToSelect={0}
            setSelectedView={setSelectedView}
          />
          <SelectViewButton
            buttonText="FlatList"
            currentSelectedView={selectedView}
            viewToSelect={1}
            setSelectedView={setSelectedView}
          />
        </View>
        {selectedView === 0 && <Flash />}
        {selectedView === 1 && <Flat />}
      </View>
    </ListsProfiler>
  );
}

function SelectViewButton({
  currentSelectedView,
  viewToSelect,
  buttonText,
  setSelectedView,
}: {
  currentSelectedView: number;
  viewToSelect: number;
  buttonText: string;
  setSelectedView: Dispatch<SetStateAction<number>>;
}) {
  const handlePress = useCallback(() => {
    setSelectedView(viewToSelect);
  }, [setSelectedView, viewToSelect]);

  return (
    <Pressable
      style={[
        styles.button,
        viewToSelect === currentSelectedView && styles.buttonSelected,
      ]}
      onPress={handlePress}>
      <Text style={styles.buttonText}>{`${buttonText}${
        viewToSelect === currentSelectedView ? ' (SELECTED)' : ''
      }`}</Text>
    </Pressable>
  );
}

function Flat() {
  const data = useRef(Array.from(Array(500).keys()));
  const renderItem: ListRenderItem<number> = useCallback(
    (info: ListRenderItemInfo<number>) => {
      return <ListItem index={info.index} isFlashList={false} />;
    },
    [],
  );
  const keyExtractor = useCallback((item: number, _index: number) => {
    return `${item}`;
  }, []);

  return (
    <FlatListPerformanceView
      style={[styles.flat, styles.listContainer]}
      listName="FlatList">
      <FlatList
        data={data.current}
        renderItem={renderItem}
        keyExtractor={keyExtractor}
      />
    </FlatListPerformanceView>
  );
}

function Flash() {
  const data = useRef(Array.from(Array(500).keys()));
  return (
    <FlashListPerformanceView
      listName="FlashList"
      style={[styles.flash, styles.listContainer]}>
      <FlashList
        data={data.current}
        renderItem={({index}) => <ListItem index={index} isFlashList={true} />}
        estimatedItemSize={50}
      />
    </FlashListPerformanceView>
  );
}

function ListItem({index, isFlashList}: {index: number; isFlashList: boolean}) {
  return (
    <View
      style={[
        styles.listItem,
        index % 2 === 0
          ? isFlashList
            ? styles.listItemEvenFlash
            : styles.listItemEvenFast
          : isFlashList
          ? styles.listItemOddFlash
          : styles.listItemOddFast,
      ]}>
      <Text style={styles.listItemText}>
        `{isFlashList ? 'FLASH' : 'FLAT'} {index}`
      </Text>
    </View>
  );
}
