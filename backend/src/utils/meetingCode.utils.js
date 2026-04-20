import { uniqueNamesGenerator, adjectives, colors, animals } from 'unique-names-generator';

export const getMeetingCode = () =>
  uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    length: 3,
  });
