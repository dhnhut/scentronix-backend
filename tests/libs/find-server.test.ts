import { describe, expect, test } from '@jest/globals';

jest.mock('../../libs/server-endpoints');
const ServerEndPoints = require('../../libs/server-endpoints');

import { ServerEndPoint } from '../../definitions/server-endpoint';
import findServer from '../../libs/find-server';

import axios from 'axios';
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Endpoints list', () => {
  test('has single available server', () => {
    ServerEndPoints.mockImplementation((): ServerEndPoint[] => {
      const servers: ServerEndPoint[] = [
        new ServerEndPoint('https://available.com', 10),
      ];
      return servers;
    });

    mockedAxios.head.mockImplementation((url) => {
      return Promise.resolve();
    });

    return expect(findServer()).resolves.toEqual({
      _url: 'https://available.com',
      _available: true,
      _priority: 10,
    });
  });

  test('has all multiple available servers', () => {
    ServerEndPoints.mockImplementation((): ServerEndPoint[] => {
      const servers: ServerEndPoint[] = [
        new ServerEndPoint('https://available.com', 10),
        new ServerEndPoint('https://higher-available.com', 1),
      ];
      return servers;
    });
    mockedAxios.get.mockImplementation((url) => {
      return Promise.resolve();
    });

    return expect(findServer()).resolves.toEqual({
      _url: 'https://higher-available.com',
      _available: true,
      _priority: 1,
    });
  });

  test('has some available servers', () => {
    ServerEndPoints.mockImplementation((): ServerEndPoint[] => {
      const servers: ServerEndPoint[] = [
        new ServerEndPoint('https://un-available.com', 1),
        new ServerEndPoint('https://available.com', 5),
        new ServerEndPoint('https://also-un-available.com', 2),
        new ServerEndPoint('https://higher-available.com', 3),
      ];
      return servers;
    });
    mockedAxios.head.mockImplementation((url) => {
      switch (url) {
        case 'https://un-available.com':
        case 'https://also-un-available.com':
          return Promise.reject();
        default:
          return Promise.resolve();
      }
    });

    return expect(findServer()).resolves.toEqual({
      _url: 'https://higher-available.com',
      _available: true,
      _priority: 3,
    });
  });
});

describe('Unavailable endpoints', () => {
  test('empty endpoints list', async () => {
    ServerEndPoints.mockImplementation((): ServerEndPoint[] => {
      return [];
    });

    return expect(findServer()).rejects.toBe('No any available server');
  });

  test('all endpoint are unavailable', () => {
    ServerEndPoints.mockImplementation((): ServerEndPoint[] => {
      const servers: ServerEndPoint[] = [
        new ServerEndPoint('https://unavailable.com', 1),
        new ServerEndPoint('https://also-unavailable.com', 4),
      ];
      return servers;
    });
    mockedAxios.head.mockImplementation((_url) => {
      return Promise.reject()
    });

    return expect(findServer()).rejects.toBe('No any available server');
  });
});
