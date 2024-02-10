import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    title: {
      marginBottom: theme.spacing(3),
    },
    card: {
      padding: theme.spacing(3),
      backgroundColor: '#fff',
      borderRadius: 8,
      boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
    },
  })
);

const DashboardPage: React.FC = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography variant='h4' className={classes.title}>
        Dashboard
      </Typography>
      <Grid container spacing={3}>
        {/* グリッド内のコンポーネントを配置 */}
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.card}>
            {/* コンテンツ */}
            <Typography variant='h6'>予約管理</Typography>
            <Typography variant='body1'>
              予約の一覧や詳細を管理します。
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.card}>
            {/* コンテンツ */}
            <Typography variant='h6'>客室管理</Typography>
            <Typography variant='body1'>
              客室の追加や編集を行います。
            </Typography>
          </div>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <div className={classes.card}>
            {/* コンテンツ */}
            <Typography variant='h6'>ユーザー管理</Typography>
            <Typography variant='body1'>
              ユーザーアカウントの管理を行います。
            </Typography>
          </div>
        </Grid>
        {/* 他のダッシュボードアイテムを追加 */}
      </Grid>
    </div>
  );
};

export default DashboardPage;
