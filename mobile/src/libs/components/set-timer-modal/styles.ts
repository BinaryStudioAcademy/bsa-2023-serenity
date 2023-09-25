import { StyleSheet } from 'react-native';

import { AppColor } from '#libs/enums/enums';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: AppColor.GRAY_200_ALPHA_50,
  },
  modal: {
    backgroundColor: AppColor.WHITE,
    borderColor: AppColor.GRAY_100,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
    paddingHorizontal: 30,
    paddingTop: 30,
    elevation: 20,
    shadowColor: AppColor.BLUE_300,
  },
  title: {
    alignSelf: 'center',
    color: AppColor.BLACK,
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 20,
  },
  durations: {
    flexDirection: 'row',
    gap: 20,
    justifyContent: 'center',
    marginBottom: 10,
  },
  duration: {
    color: AppColor.GRAY_200_ALPHA_50,
    fontSize: 20,
  },
  durationItem: {
    alignItems: 'center',
    backgroundColor: AppColor.WHITE,
    borderColor: AppColor.GRAY_200_ALPHA_50,
    borderRadius: 80,
    borderWidth: 1,
    height: 80,
    justifyContent: 'center',
    width: 80,
  },
  durationUnit: {
    color: AppColor.GRAY_200_ALPHA_50,
    fontSize: 12,
  },
  activeDuration: {
    backgroundColor: AppColor.BLUE_300,
    borderWidth: 0,
  },
  activeText: {
    color: AppColor.WHITE,
  },
  button: {
    borderRadius: 40,
    height: 52,
  },
});

export { styles };