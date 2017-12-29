export const PhotoSchema = {
    name: 'Photo',
    properties: {
      date:     'string',
      picture:  'string',
      star:     'bool',
      albums:   'Album[]',
      location: 'double[]',
    }
};

export const AlbumSchema = {
    name: 'Album',
    properties: {
      name:     'string',
      photos:   'Photo[]'
    }
};

export const UserPrefSchema = {
      name: 'UserPref',
      properties: {
          reminderTime:     'string',
      }
};

export const DogSchema = {
        name: 'Dog', 
        properties: {
            name: 'string'
        }
};