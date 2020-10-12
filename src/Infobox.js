import React from 'react';
import {Card, CardContent, Typography} from '@material-ui/core';

function Infobox({title, cases, total }) {
    return (
        <Card className='infobox'>
            <CardContent>
                {/* title */}
                <Typography className='infobox__title' color='textSecondary'>{title}</Typography>
                {/* no of cases */}
                <h2 className='infobox__cases'>{cases}</h2>
                {/* total */}
                <Typography className='infobox__total'>{total} Total </Typography>
            </CardContent>
        </Card>
    )
}

export default Infobox
