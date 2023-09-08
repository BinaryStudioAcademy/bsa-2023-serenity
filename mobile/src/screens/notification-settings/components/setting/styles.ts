import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 30,
    paddingVertical: 30,
    backgroundColor: AppColor.GRAY_100,
    borderRadius: 20,
    shadowColor: AppColor.GRAY_600,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 6,
  },
  label: {
    fontWeight: '600',
    fontSize: 16,
    color: AppColor.GRAY_500,
  },
});

export { styles };