import { Button, Card, Flex, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
import React, { useEffect, useState } from 'react';
import useTimer from 'react-hook-time';

import { CopyOutlined } from '@ant-design/icons';
import moon from '../../assets/images/moon.png';
import sun from '../../assets/images/sun.png';

dayjs.extend(duration);

interface Roshan {
  no: number;
  slainedTime?: number;
  minRespawnTime?: number;
  maxRespawnTime?: number;
  consumableDrops: string[];
}

const { Title } = Typography;

const RoshanTimer: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [isDayTime, setIsDayTime] = useState(true);
  const [isRoshanAlive, setIsRoshanAlive] = useState(true);
  const [roshan, setRoshan] = useState<Roshan[]>([
    {
      no: 1,
      minRespawnTime: undefined,
      maxRespawnTime: undefined,
      consumableDrops: ['Aegis of the Immortal'],
    },
  ]);

  const { currentTime, start, pause, reset } = useTimer(0, {
    stopwatch: true,
  });

  const startTimer = () => {
    setIsPaused(false);
    start();
  };

  const pauseTimer = () => {
    setIsPaused(true);
    pause();
  };

  const resetTimer = () => {
    setIsPaused(false);
    pause();
    reset();
  };

  const onRoshanSlain = (slainedTime: number) => {
    setIsRoshanAlive(false);

    // Set previous roshan slained time
    const lastRoshan = roshan[roshan.length - 1];
    setRoshan((prev) => [
      ...prev.slice(0, prev.length - 1),
      {
        ...lastRoshan,
        slainedTime,
      },
    ]);

    const consumableDrops = ['Aegis of the Immortal', 'Cheese'];
    setRoshan((prev) => [
      ...prev,
      {
        no: roshan.length + 1,
        minRespawnTime: slainedTime + 480,
        maxRespawnTime: slainedTime + 660,
        consumableDrops,
      },
    ]);
  };

  const onCopyChatCode = (minRespawnTime: number, maxRespawnTime: number) => {
    const chatCode = `${dayjs.duration(minRespawnTime, 'second').format('mmss')} ${dayjs.duration(maxRespawnTime, 'second').format('mmss')}`;
    void navigator.clipboard.writeText(chatCode);
  };

  useEffect(() => {
    if (currentTime === 0) {
      setIsDayTime(true);
      return;
    }
    if (currentTime % 300 === 0) {
      setIsDayTime((prev) => !prev);
    }
  }, [currentTime]);

  useEffect(() => {
    // check currentTime between roshan respawn time and set isRoshanAlive to true
    if (roshan.length > 1) {
      const lastRoshan = roshan[roshan.length - 1];
      if (
        currentTime >= lastRoshan.minRespawnTime! &&
        currentTime <= lastRoshan.maxRespawnTime!
      ) {
        setIsRoshanAlive(true);
      }
    }
  }, [currentTime]);

  return (
    <Card>
      <Flex align="center" justify="center">
        <h1 style={{ fontFamily: 'OPTIwtcGoudy-Medium' }}>Roshan Timer</h1>
      </Flex>
      <Flex align="center" justify="center">
        <img
          src={isDayTime ? sun : moon}
          alt="clock-image"
          style={{ width: '32px' }}
        />
      </Flex>
      <Flex align="center" justify="center">
        <Title level={3}>
          {dayjs.duration(currentTime, 'second').format('mm:ss')}
        </Title>
      </Flex>
      <Flex align="center" justify="center">
        <div>
          {isRoshanAlive
            ? `Roshan is in ${isDayTime ? 'bottom' : 'top'} pit`
            : 'Roshan is dead'}
        </div>
      </Flex>
      <Flex align="center" justify="center" gap={6}>
        {(currentTime == 0 || isPaused) && (
          <Button type="primary" onClick={startTimer}>
            {isPaused ? 'Resume' : 'Start'}
          </Button>
        )}
        {currentTime > 0 && !isPaused && (
          <Button type="default" onClick={pauseTimer}>
            Pause
          </Button>
        )}
        {currentTime > 0 && isPaused && (
          <Button type="primary" onClick={resetTimer} danger>
            Reset
          </Button>
        )}
      </Flex>
      {currentTime > 0 && isRoshanAlive && (
        <Flex align="center" justify="center">
          <Button type="primary" onClick={() => onRoshanSlain(currentTime)}>
            Roshan was slain
          </Button>
        </Flex>
      )}
      <Flex align="center" justify="center">
        <Table style={{ width: '100%' }} dataSource={roshan}>
          <Table.Column title="No." dataIndex="no" />
          <Table.Column
            title="Slained Time"
            render={(record: Roshan) => {
              if (!record.slainedTime) {
                return '';
              } else {
                return dayjs
                  .duration(record.slainedTime, 'second')
                  .format('mm:ss');
              }
            }}
          />
          <Table.Column
            title="Next Respawn Time"
            render={(record: Roshan) => {
              if (!record.minRespawnTime || !record.maxRespawnTime) {
                return '';
              } else {
                return `${dayjs.duration(record.minRespawnTime, 'second').format('mm:ss')} - ${dayjs.duration(record.maxRespawnTime, 'second').format('mm:ss')}`;
              }
            }}
          />
          <Table.Column
            title="Consumable Drops"
            render={(record: Roshan) => {
              return record.consumableDrops.join(', ');
            }}
          />
          <Table.Column
            render={(record: Roshan) => {
              if (!record.minRespawnTime || !record.maxRespawnTime) {
                return '';
              }
              return (
                <Button
                  type="default"
                  icon={<CopyOutlined />}
                  onClick={() =>
                    onCopyChatCode(
                      record.minRespawnTime!,
                      record.maxRespawnTime!,
                    )
                  }
                />
              );
            }}
          />
        </Table>
      </Flex>
    </Card>
  );
};

export default RoshanTimer;
