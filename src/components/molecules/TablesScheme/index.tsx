import React, { useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import {
  DraxProvider,
  DraxView,
  DraxSnapbackTargetPreset,
  Position,
} from 'react-native-drax';
import { Text } from '@ui-kitten/components';
import Prompt from '~/components/atoms/Prompt';

export interface Table {
  seats: number;
  type: 'square' | 'circle';
  row: number;
  column: number;
  isTemplate?: boolean;
}

interface SquareProps {
  width: number;
  position: Table;
}

const Square = ({ width, position }: SquareProps) => {
  return (
    <DraxView
      style={[styles.square, { width }]}
      receivingStyle={styles.receiving}
      onReceiveDragDrop={({ dragged: { payload } }) => {
        payload?.handleDrag(
          payload.tableIndex,
          payload.type,
          position,
          payload.isTemplate,
        );
        return DraxSnapbackTargetPreset.None;
      }}
    />
  );
};

interface Props {
  heightSize?: number;
  widthSize?: number;
  tables: Table[];
  setTables: (tables: Table[]) => void;
}

const TablesScheme = (props: Props) => {
  const { heightSize, widthSize, setTables, tables } = props;
  const [lastTableItem, setLastTableItem] = useState<number>(0);
  const [showSeatsCountPrompt, setShowSeatsCountPrompt] =
    useState<boolean>(false);
  const { width, height } = Dimensions.get('window');
  const boardWidth = Math.min(width, height);
  const squareWidth = boardWidth / (widthSize + 2);
  const rowViews: JSX.Element[] = [];

  for (let row = 0; row < heightSize; row += 1) {
    const squareViews: JSX.Element[] = [];
    for (let column = 0; column < widthSize; column += 1) {
      squareViews.push(
        <Square
          width={squareWidth}
          key={`r${row}c${column}`}
          position={{ row, column }}
        />,
      );
    }
    rowViews.push(
      <View key={`r${row}`} style={styles.row}>
        {squareViews}
      </View>,
    );
  }

  const updateCountById = (id: number, value: string) => {
    const newTables = tables.map((table, index) =>
      id === index ? { ...table, seats: +value } : table,
    );
    setTables(newTables);
  };

  const handleSeatsCountPrompt = (value: string) => {
    setShowSeatsCountPrompt(false);
    updateCountById(lastTableItem, value);
  };

  const handleDrag = (
    tableIndex: number | undefined,
    type: Table['type'],
    position: Position,
    isTemplate: boolean,
  ) => {
    if (isTemplate) {
      const items = [
        ...tables,
        {
          ...position,
          type,
          seats: 2,
        },
      ];
      setLastTableItem(items.length - 1);
      setTables(items);
      setShowSeatsCountPrompt(true);
    } else {
      const items = tables.map((table, index) =>
        tableIndex === index ? { ...table, ...position } : table,
      );
      setTables(items);
    }
  };

  const removeTable = (id?: number) => {
    const newTables = tables.filter((table, index) => id !== index);
    setTables(newTables);
  };

  const renderItem = (table: Table, index?: number) => (
    <DraxView
      style={[
        styles.tableItem,
        {
          width: squareWidth,
          height: squareWidth,
          top: table.row * squareWidth,
          left: table.column * squareWidth,
        },
      ]}
      key={`${index}-table`}
      draggingStyle={styles.dragging}
      dragPayload={{
        handleDrag,
        isTemplate: table.isTemplate,
        tableIndex: index,
        type: table.type,
      }}
      onDragEnd={() => removeTable(index)}>
      <View
        style={[styles.table, table.type === 'circle' && styles.circleTable]}>
        <Text style={styles.tableLabel}>{table.seats}</Text>
        <Text style={styles.tableLabel}>Seats</Text>
      </View>
    </DraxView>
  );

  const renderTables = () =>
    tables.map((table, index) => renderItem(table, index));

  const renderTemplateTables = () => {
    const templateTables: Table[] = [
      {
        row: -2,
        column: 0,
        type: 'square',
        seats: 2,
        isTemplate: true,
      },
      {
        row: -2,
        column: 2,
        type: 'circle',
        seats: 2,
        isTemplate: true,
      },
    ];

    return templateTables.map((table, key) => renderItem(table, key));
  };

  return (
    <DraxProvider>
      <View style={styles.container}>
        <Prompt
          title="Enter seats number"
          visible={showSeatsCountPrompt}
          onSubmit={handleSeatsCountPrompt}
        />
        <View style={styles.containerRow}>
          <View style={styles.board}>
            {rowViews}
            {renderTemplateTables()}
            {renderTables()}
          </View>
        </View>
      </View>
    </DraxProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 70,
  },
  containerRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
  },
  board: {
    borderColor: '#e5e3e3',
    borderWidth: 1,
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    aspectRatio: 1,
  },
  receiving: {
    borderColor: '#ff00ff',
    borderWidth: 2,
  },
  tableItem: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dragging: {
    opacity: 0.2,
  },
  table: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#f6f6f6',
    height: '100%',
    width: '100%',
  },
  tableLabel: {
    fontSize: 10,
    textAlign: 'center',
  },
  circleTable: {
    borderRadius: 50,
  },
});

TablesScheme.defaultProps = {
  heightSize: 10,
  widthSize: 8,
};

export default TablesScheme;
