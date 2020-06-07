import axios from 'axios';
import { nextCharactersFetcher } from '../ListSlice';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const Rick = {
  id: 1,
  name: 'Rick Sanchez',
  status: 'Alive' as 'Alive',
  species: 'Human',
  type: '',
  gender: 'male' as 'male',
  origin: {
    name: '',
    url: '',
  },
  location: {
    name: '',
    url: '',
  },
  image: '',
  episode: [],
  url: '',
  created: new Date('1958-06-03'),
};

describe('Given a fetcher to get the characters list of next page', () => {
  describe('when start', () => {
    beforeEach(() => {
      mockedAxios.get.mockImplementationOnce(() => Promise.resolve({ data: { results: [Rick] } }));
    });
    it('should fetch first page', async () => {
      await nextCharactersFetcher(mockedAxios)();
      expect(mockedAxios.get).toBeCalledWith('/character/?page=1');
    });

    it('should return a list of characters', async () => {
      const data = await nextCharactersFetcher(mockedAxios)();
      expect(data).toEqual([Rick]);
    });
  });

  describe('when is fetched a second time', () => {
    it('should fetch second page', async () => {
      mockedAxios.get.mockImplementation(() => Promise.resolve({ data: { results: [Rick] } }));

      const fetcher = nextCharactersFetcher(mockedAxios);
      await fetcher();
      await fetcher();
      expect(mockedAxios.get).toBeCalledWith('/character/?page=2');
    });
  });
});
